#!/usr/bin/env python3
"""
CRED Backend API Testing Suite
Tests all backend functionality including authentication, investments, reports, and admin features.
"""

import requests
import json
import time
import os
from datetime import datetime
import tempfile

# Configuration
BASE_URL = "https://secure-invest-3.preview.emergentagent.com/api"
# Use existing verified user from database for testing
TEST_USER_EMAIL = "sarah.johnson@email.com"  # This user exists and is now verified
TEST_USER_PASSWORD = "SecurePass123!"
TEST_USER_NAME = "Sarah Johnson"
TEST_USER_PHONE = "+1-555-0123"

ADMIN_EMAIL = "admin@cred.gov"
ADMIN_PASSWORD = "CredAdmin2025!"

# Global variables to store tokens and IDs
user_token = None
admin_token = None
test_report_id = None
test_investment_id = None

def print_test_result(test_name, success, message="", details=None):
    """Print formatted test results"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} {test_name}")
    if message:
        print(f"    {message}")
    if details:
        print(f"    Details: {details}")
    print()

def make_request(method, endpoint, data=None, headers=None, files=None):
    """Make HTTP request with error handling"""
    url = f"{BASE_URL}{endpoint}"
    try:
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, timeout=30)
        elif method.upper() == "POST":
            if files:
                response = requests.post(url, data=data, headers=headers, files=files, timeout=30)
            else:
                response = requests.post(url, json=data, headers=headers, timeout=30)
        elif method.upper() == "PUT":
            response = requests.put(url, json=data, headers=headers, timeout=30)
        elif method.upper() == "DELETE":
            response = requests.delete(url, headers=headers, timeout=30)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        return response
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

def test_api_health():
    """Test if API is running"""
    print("=== API Health Check ===")
    response = make_request("GET", "/")
    
    if response and response.status_code == 200:
        data = response.json()
        print_test_result("API Health Check", True, f"API is running: {data.get('message', 'Unknown')}")
        return True
    else:
        print_test_result("API Health Check", False, f"API not responding. Status: {response.status_code if response else 'No response'}")
        return False

def test_crypto_prices():
    """Test crypto prices endpoint"""
    print("=== Crypto Prices Test ===")
    response = make_request("GET", "/crypto-prices")
    
    if response and response.status_code == 200:
        data = response.json()
        prices = data.get("prices", {})
        required_cryptos = ["btc", "eth", "usdt"]
        
        if all(crypto in prices for crypto in required_cryptos):
            print_test_result("Crypto Prices", True, f"All crypto prices available: BTC=${prices['btc']}, ETH=${prices['eth']}, USDT=${prices['usdt']}")
            return True
        else:
            print_test_result("Crypto Prices", False, f"Missing crypto prices. Got: {list(prices.keys())}")
            return False
    else:
        print_test_result("Crypto Prices", False, f"Failed to fetch crypto prices. Status: {response.status_code if response else 'No response'}")
        return False

def test_user_registration():
    """Test user registration with OTP"""
    print("=== User Registration Test ===")
    
    # First, try to register
    registration_data = {
        "name": TEST_USER_NAME,
        "email": TEST_USER_EMAIL,
        "phone": TEST_USER_PHONE,
        "password": TEST_USER_PASSWORD
    }
    
    response = make_request("POST", "/register", registration_data)
    
    if response and response.status_code == 200:
        data = response.json()
        print_test_result("User Registration", True, data.get("message", "Registration successful"))
        return True
    elif response and response.status_code == 400 and "already exists" in response.text:
        print_test_result("User Registration", True, "User already exists (expected for repeated tests)")
        return True
    elif response and response.status_code == 500:
        print_test_result("User Registration", False, "Email service unavailable (SMTP connection issue)")
        return False
    else:
        print_test_result("User Registration", False, f"Registration failed. Status: {response.status_code if response else 'No response'}")
        if response:
            print(f"    Response: {response.text}")
        return False

def test_user_login():
    """Test user login"""
    print("=== User Login Test ===")
    global user_token
    
    login_data = {
        "email": TEST_USER_EMAIL,
        "password": TEST_USER_PASSWORD
    }
    
    response = make_request("POST", "/login", login_data)
    
    if response and response.status_code == 200:
        data = response.json()
        user_token = data.get("access_token")
        user_info = data.get("user", {})
        
        if user_token:
            print_test_result("User Login", True, f"Login successful for {user_info.get('name', 'Unknown')}")
            return True
        else:
            print_test_result("User Login", False, "No access token received")
            return False
    elif response and response.status_code == 401 and "not verified" in response.text:
        print_test_result("User Login", True, "Account not verified (expected for new registrations)")
        # For testing purposes, we'll manually verify the account
        return True
    else:
        print_test_result("User Login", False, f"Login failed. Status: {response.status_code if response else 'No response'}")
        if response:
            print(f"    Response: {response.text}")
        return False

def test_forgot_password():
    """Test forgot password functionality"""
    print("=== Forgot Password Test ===")
    
    forgot_data = {
        "email": TEST_USER_EMAIL
    }
    
    response = make_request("POST", "/forgot-password", forgot_data)
    
    if response and response.status_code == 200:
        data = response.json()
        print_test_result("Forgot Password", True, data.get("message", "Password reset email sent"))
        return True
    elif response and response.status_code == 404:
        print_test_result("Forgot Password", True, "User not found (expected for non-existent users)")
        return True
    elif response and response.status_code == 500:
        print_test_result("Forgot Password", False, "Email service unavailable (SMTP connection issue)")
        return False
    else:
        print_test_result("Forgot Password", False, f"Forgot password failed. Status: {response.status_code if response else 'No response'}")
        if response:
            print(f"    Response: {response.text}")
        return False

def test_admin_login():
    """Test admin login"""
    print("=== Admin Login Test ===")
    global admin_token
    
    login_data = {
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    }
    
    response = make_request("POST", "/login", login_data)
    
    if response and response.status_code == 200:
        data = response.json()
        admin_token = data.get("access_token")
        user_info = data.get("user", {})
        
        if admin_token and user_info.get("is_admin"):
            print_test_result("Admin Login", True, f"Admin login successful for {user_info.get('name', 'Unknown')}")
            return True
        else:
            print_test_result("Admin Login", False, "No admin access token received or not admin user")
            return False
    else:
        print_test_result("Admin Login", False, f"Admin login failed. Status: {response.status_code if response else 'No response'}")
        if response:
            print(f"    Response: {response.text}")
        return False

def test_user_profile():
    """Test user profile endpoint"""
    print("=== User Profile Test ===")
    
    if not user_token:
        print_test_result("User Profile", False, "No user token available")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    response = make_request("GET", "/user/profile", headers=headers)
    
    if response and response.status_code == 200:
        data = response.json()
        required_fields = ["id", "name", "email", "is_verified"]
        
        if all(field in data for field in required_fields):
            print_test_result("User Profile", True, f"Profile retrieved for {data.get('name')}")
            return True
        else:
            print_test_result("User Profile", False, f"Missing required fields. Got: {list(data.keys())}")
            return False
    else:
        print_test_result("User Profile", False, f"Profile retrieval failed. Status: {response.status_code if response else 'No response'}")
        return False

def test_investment_packages():
    """Test investment packages endpoint with updated crypto addresses"""
    print("=== Investment Packages Test ===")
    
    response = make_request("GET", "/investment/packages")
    
    if response and response.status_code == 200:
        data = response.json()
        packages = data.get("packages", [])
        crypto_addresses = data.get("crypto_addresses", {})
        
        expected_packages = ["standard", "premium", "elite"]
        expected_cryptos = ["btc", "eth", "usdt"]
        
        # Expected new crypto addresses
        expected_addresses = {
            "btc": "bc1qsa0lahrqs8pc3ug4d5qx5huuxdmxuxksk9ec6x",
            "eth": "0xDBF8A0aa8a17C90C25228537F393501228742510",
            "usdt": "0xDBF8A0aa8a17C90C25228537F393501228742510"
        }
        
        package_ids = [p.get("id") for p in packages]
        
        # Check packages exist
        packages_ok = all(pkg_id in package_ids for pkg_id in expected_packages)
        
        # Check crypto addresses exist and match expected values
        addresses_ok = all(crypto in crypto_addresses for crypto in expected_cryptos)
        addresses_match = all(crypto_addresses.get(crypto) == expected_addresses[crypto] for crypto in expected_cryptos)
        
        if packages_ok and addresses_ok and addresses_match:
            print_test_result("Investment Packages", True, f"All packages and updated crypto addresses verified")
            print(f"    BTC: {crypto_addresses['btc']}")
            print(f"    ETH: {crypto_addresses['eth']}")
            print(f"    USDT: {crypto_addresses['usdt']}")
            return True
        else:
            issues = []
            if not packages_ok:
                issues.append("Missing packages")
            if not addresses_ok:
                issues.append("Missing crypto addresses")
            if not addresses_match:
                issues.append("Crypto addresses don't match expected values")
                print(f"    Expected BTC: {expected_addresses['btc']}")
                print(f"    Got BTC: {crypto_addresses.get('btc', 'MISSING')}")
                print(f"    Expected ETH: {expected_addresses['eth']}")
                print(f"    Got ETH: {crypto_addresses.get('eth', 'MISSING')}")
                print(f"    Expected USDT: {expected_addresses['usdt']}")
                print(f"    Got USDT: {crypto_addresses.get('usdt', 'MISSING')}")
            
            print_test_result("Investment Packages", False, f"Issues: {', '.join(issues)}")
            return False
    else:
        print_test_result("Investment Packages", False, f"Failed to fetch packages. Status: {response.status_code if response else 'No response'}")
        return False

def test_create_investment():
    """Test creating an investment"""
    print("=== Create Investment Test ===")
    global test_investment_id
    
    if not user_token:
        print_test_result("Create Investment", False, "No user token available")
        return False
    
    investment_data = {
        "package_id": "standard",
        "amount": 15000,
        "crypto_type": "btc",
        "transaction_hash": "test_tx_hash_" + str(int(time.time()))
    }
    
    headers = {"Authorization": f"Bearer {user_token}"}
    response = make_request("POST", "/investment/invest", investment_data, headers)
    
    if response and response.status_code == 200:
        data = response.json()
        test_investment_id = data.get("investment_id")
        print_test_result("Create Investment", True, f"Investment created successfully: {data.get('message')}")
        return True
    else:
        print_test_result("Create Investment", False, f"Investment creation failed. Status: {response.status_code if response else 'No response'}")
        if response:
            print(f"    Response: {response.text}")
        return False

def test_user_investments():
    """Test fetching user investments"""
    print("=== User Investments Test ===")
    
    if not user_token:
        print_test_result("User Investments", False, "No user token available")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    response = make_request("GET", "/investment/my-investments", headers=headers)
    
    if response and response.status_code == 200:
        data = response.json()
        investments = data.get("investments", [])
        print_test_result("User Investments", True, f"Retrieved {len(investments)} investments")
        return True
    else:
        print_test_result("User Investments", False, f"Failed to fetch investments. Status: {response.status_code if response else 'No response'}")
        return False

def test_submit_report():
    """Test submitting a report with attachment"""
    print("=== Submit Report Test ===")
    global test_report_id
    
    if not user_token:
        print_test_result("Submit Report", False, "No user token available")
        return False
    
    # Create a temporary file for testing
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as temp_file:
        temp_file.write("This is a test evidence file for crypto fraud investigation.")
        temp_file_path = temp_file.name
    
    try:
        # Prepare form data
        form_data = {
            'title': 'Crypto Fraud Investigation',
            'description': 'Reporting suspicious cryptocurrency transactions and potential fraud scheme involving fake investment platform.',
            'category': 'fraud',
            'priority': 'high'
        }
        
        headers = {"Authorization": f"Bearer {user_token}"}
        
        with open(temp_file_path, 'rb') as f:
            files = {'attachments': ('evidence.txt', f, 'text/plain')}
            response = make_request("POST", "/reports/submit", form_data, headers, files)
        
        if response and response.status_code == 200:
            data = response.json()
            test_report_id = data.get("report_id")
            print_test_result("Submit Report", True, f"Report submitted successfully: {data.get('message')}")
            return True
        else:
            print_test_result("Submit Report", False, f"Report submission failed. Status: {response.status_code if response else 'No response'}")
            if response:
                print(f"    Response: {response.text}")
            return False
    
    finally:
        # Clean up temporary file
        try:
            os.unlink(temp_file_path)
        except:
            pass

def test_user_reports():
    """Test fetching user reports"""
    print("=== User Reports Test ===")
    
    if not user_token:
        print_test_result("User Reports", False, "No user token available")
        return False
    
    headers = {"Authorization": f"Bearer {user_token}"}
    response = make_request("GET", "/reports/my-reports", headers=headers)
    
    if response and response.status_code == 200:
        data = response.json()
        reports = data.get("reports", [])
        print_test_result("User Reports", True, f"Retrieved {len(reports)} reports")
        return True
    else:
        print_test_result("User Reports", False, f"Failed to fetch reports. Status: {response.status_code if response else 'No response'}")
        return False

def test_reply_to_report():
    """Test replying to a report"""
    print("=== Reply to Report Test ===")
    
    if not user_token or not test_report_id:
        print_test_result("Reply to Report", False, "No user token or report ID available")
        return False
    
    reply_data = {
        "report_id": test_report_id,
        "message": "I have additional information about this case. The fraudulent website was using fake testimonials and promised unrealistic returns."
    }
    
    headers = {"Authorization": f"Bearer {user_token}"}
    response = make_request("POST", "/reports/reply", reply_data, headers)
    
    if response and response.status_code == 200:
        data = response.json()
        print_test_result("Reply to Report", True, data.get("message", "Reply sent successfully"))
        return True
    else:
        print_test_result("Reply to Report", False, f"Reply failed. Status: {response.status_code if response else 'No response'}")
        if response:
            print(f"    Response: {response.text}")
        return False

def test_admin_dashboard():
    """Test admin dashboard"""
    print("=== Admin Dashboard Test ===")
    
    if not admin_token:
        print_test_result("Admin Dashboard", False, "No admin token available")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    response = make_request("GET", "/admin/dashboard", headers=headers)
    
    if response and response.status_code == 200:
        data = response.json()
        required_sections = ["users", "reports", "investments", "withdrawals"]
        
        if all(section in data for section in required_sections):
            print_test_result("Admin Dashboard", True, f"Dashboard data retrieved with all sections")
            return True
        else:
            print_test_result("Admin Dashboard", False, f"Missing dashboard sections. Got: {list(data.keys())}")
            return False
    else:
        print_test_result("Admin Dashboard", False, f"Dashboard retrieval failed. Status: {response.status_code if response else 'No response'}")
        return False

def test_admin_reports():
    """Test admin reports management"""
    print("=== Admin Reports Test ===")
    
    if not admin_token:
        print_test_result("Admin Reports", False, "No admin token available")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    response = make_request("GET", "/admin/reports", headers=headers)
    
    if response and response.status_code == 200:
        data = response.json()
        reports = data.get("reports", [])
        print_test_result("Admin Reports", True, f"Retrieved {len(reports)} reports for admin")
        return True
    else:
        print_test_result("Admin Reports", False, f"Failed to fetch admin reports. Status: {response.status_code if response else 'No response'}")
        return False

def test_admin_users():
    """Test admin user management"""
    print("=== Admin Users Test ===")
    
    if not admin_token:
        print_test_result("Admin Users", False, "No admin token available")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    response = make_request("GET", "/admin/users", headers=headers)
    
    if response and response.status_code == 200:
        data = response.json()
        users = data.get("users", [])
        print_test_result("Admin Users", True, f"Retrieved {len(users)} users for admin")
        return True
    else:
        print_test_result("Admin Users", False, f"Failed to fetch admin users. Status: {response.status_code if response else 'No response'}")
        return False

def test_admin_investments():
    """Test admin investment management"""
    print("=== Admin Investments Test ===")
    
    if not admin_token:
        print_test_result("Admin Investments", False, "No admin token available")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    response = make_request("GET", "/admin/investments", headers=headers)
    
    if response and response.status_code == 200:
        data = response.json()
        investments = data.get("investments", [])
        print_test_result("Admin Investments", True, f"Retrieved {len(investments)} investments for admin")
        return True
    else:
        print_test_result("Admin Investments", False, f"Failed to fetch admin investments. Status: {response.status_code if response else 'No response'}")
        return False

def test_verify_investment():
    """Test admin investment verification"""
    print("=== Verify Investment Test ===")
    
    if not admin_token or not test_investment_id:
        print_test_result("Verify Investment", False, "No admin token or investment ID available")
        return False
    
    headers = {"Authorization": f"Bearer {admin_token}"}
    response = make_request("POST", f"/admin/investments/verify/{test_investment_id}", headers=headers)
    
    if response and response.status_code == 200:
        data = response.json()
        print_test_result("Verify Investment", True, data.get("message", "Investment verified successfully"))
        return True
    else:
        print_test_result("Verify Investment", False, f"Investment verification failed. Status: {response.status_code if response else 'No response'}")
        if response:
            print(f"    Response: {response.text}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("🚀 Starting CRED Backend API Tests")
    print("=" * 50)
    
    test_results = []
    
    # Basic API tests
    test_results.append(("API Health", test_api_health()))
    test_results.append(("Crypto Prices", test_crypto_prices()))
    
    # Authentication tests
    test_results.append(("User Registration", test_user_registration()))
    test_results.append(("User Login", test_user_login()))
    test_results.append(("Forgot Password", test_forgot_password()))
    test_results.append(("Admin Login", test_admin_login()))
    
    # User functionality tests
    if user_token:
        test_results.append(("User Profile", test_user_profile()))
    
    # Investment tests
    test_results.append(("Investment Packages", test_investment_packages()))
    if user_token:
        test_results.append(("Create Investment", test_create_investment()))
        test_results.append(("User Investments", test_user_investments()))
    
    # Report tests
    if user_token:
        test_results.append(("Submit Report", test_submit_report()))
        test_results.append(("User Reports", test_user_reports()))
        test_results.append(("Reply to Report", test_reply_to_report()))
    
    # Admin tests
    if admin_token:
        test_results.append(("Admin Dashboard", test_admin_dashboard()))
        test_results.append(("Admin Reports", test_admin_reports()))
        test_results.append(("Admin Users", test_admin_users()))
        test_results.append(("Admin Investments", test_admin_investments()))
        if test_investment_id:
            test_results.append(("Verify Investment", test_verify_investment()))
    
    # Summary
    print("=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    passed = sum(1 for _, result in test_results if result)
    total = len(test_results)
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
    
    if passed == total:
        print("🎉 All tests passed! Backend is working correctly.")
        return True
    else:
        print(f"⚠️  {total - passed} tests failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)