from fastapi import FastAPI, APIRouter, HTTPException, Depends, File, UploadFile, Form, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from pathlib import Path
from dotenv import load_dotenv
import os
import logging
import uuid
import jwt
import bcrypt
import pyotp
import qrcode
import io
import base64
import aiosmtplib
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import requests
import asyncio
import json

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create FastAPI app
app = FastAPI(title="CRED API", description="Crypto Regulatory Enforcement Division API")
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Utility Functions
def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hashed password"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_jwt_token(data: dict) -> str:
    """Create JWT token"""
    expire = datetime.utcnow() + timedelta(hours=int(os.environ.get('JWT_EXPIRATION_HOURS', 24)))
    data.update({"exp": expire})
    return jwt.encode(data, os.environ['JWT_SECRET'], algorithm=os.environ['JWT_ALGORITHM'])

def verify_jwt_token(token: str) -> dict:
    """Verify JWT token"""
    try:
        payload = jwt.decode(token, os.environ['JWT_SECRET'], algorithms=[os.environ['JWT_ALGORITHM']])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    token = credentials.credentials
    payload = verify_jwt_token(token)
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await db.users.find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

async def get_current_admin(user: dict = Depends(get_current_user)):
    """Get current admin user"""
    if not user.get("is_admin", False):
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

async def send_email(to_email: str, subject: str, body: str):
    """Send email using Gmail SMTP with proper SSL/TLS configuration"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = os.environ.get('EMAIL_FROM', 'CRED <hulosub4@gmail.com>')
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Create HTML part
        html_part = MIMEText(body, 'html')
        msg.attach(html_part)
        
        # Connect to Gmail SMTP with proper SSL/TLS
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  # Enable TLS
        server.login(os.environ.get('EMAIL_FROM', 'hulosub4@gmail.com').split('<')[1].split('>')[0], 
                    os.environ.get('EMAIL_PASSWORD', 'pozc oqml eyhk fprz'))
        
        # Send email
        server.send_message(msg)
        server.quit()
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return False

async def get_crypto_prices():
    """Get live crypto prices from CoinGecko API"""
    try:
        url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return {
                "btc": data.get("bitcoin", {}).get("usd", 0),
                "eth": data.get("ethereum", {}).get("usd", 0),
                "usdt": data.get("tether", {}).get("usd", 1)
            }
    except Exception as e:
        logger.error(f"Failed to fetch crypto prices: {str(e)}")
    
    # Return default prices if API fails
    return {"btc": 50000, "eth": 3000, "usdt": 1}

# Pydantic Models
class UserRegistration(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class OTPVerification(BaseModel):
    email: EmailStr
    otp: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class PasswordResetRequest(BaseModel):
    email: EmailStr
    otp: str
    new_password: str

class InvestmentRequest(BaseModel):
    package_id: str
    amount: float
    crypto_type: str  # btc, eth, usdt
    transaction_hash: Optional[str] = None

class WithdrawRequest(BaseModel):
    amount: float
    crypto_type: str
    wallet_address: str

class ReportSubmission(BaseModel):
    title: str
    description: str
    category: str
    priority: str = "medium"

class ReportReply(BaseModel):
    report_id: str
    message: str

class AdminReportUpdate(BaseModel):
    report_id: str
    status: str
    admin_notes: str

# Database Models
async def create_user_document(user_data: dict) -> dict:
    """Create user document in database"""
    user_doc = {
        "_id": str(uuid.uuid4()),
        "name": user_data["name"],
        "email": user_data["email"],
        "phone": user_data.get("phone"),
        "password_hash": hash_password(user_data["password"]),
        "is_verified": False,
        "is_admin": False,
        "otp_secret": pyotp.random_base32(),
        "created_at": datetime.utcnow(),
        "total_investment": 0.0,
        "total_returns": 0.0,
        "active_investments": 0
    }
    
    result = await db.users.insert_one(user_doc)
    if result.inserted_id:
        return user_doc
    raise HTTPException(status_code=500, detail="Failed to create user")

# API Routes
# Health check endpoint for Railway
@api_router.get("/health")
async def health_check():
    try:
        # Test database connectivity
        await client.admin.command('ping')
        return {"status": "healthy", "service": "CRED API", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "service": "CRED API", "error": str(e)}

# Simple root health check (no /api prefix)
@app.get("/health")
async def root_health_check():
    return {"status": "healthy", "service": "CRED API"}

@api_router.get("/")
async def root():
    return {"message": "CRED API is running", "version": "1.0.0"}

@api_router.get("/crypto-prices")
async def get_live_crypto_prices():
    """Get live cryptocurrency prices"""
    prices = await get_crypto_prices()
    return {"prices": prices, "timestamp": datetime.utcnow()}

@api_router.post("/register")
async def register_user(user_data: UserRegistration):
    """Register new user with OTP verification"""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create user
    user_doc = await create_user_document(user_data.dict())
    
    # Generate OTP secret and 6-digit OTP
    totp = pyotp.TOTP(user_doc["otp_secret"])
    otp = totp.now()
    
    # Ensure OTP is 6 digits
    otp = f"{int(otp) % 1000000:06d}"
    
    # Store OTP with 10-minute expiration
    await db.temp_otps.insert_one({
        "email": user_data.email,
        "otp": otp,
        "type": "registration",
        "expires_at": datetime.utcnow() + timedelta(minutes=10)
    })
    
    # Send welcome email with OTP
    subject = "Welcome to CRED - Email Verification Required"
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🛡️ CRED</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Crypto Regulatory Enforcement Division</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #1e40af; margin: 0 0 20px 0;">Welcome, {user_data.name}!</h2>
            <p style="color: #64748b; line-height: 1.6;">
                Thank you for joining CRED. To complete your registration and verify your email address, 
                please use the verification code below:
            </p>
            
            <div style="background: white; border: 2px solid #1e40af; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
                <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">Verification Code</p>
                <div style="font-size: 32px; font-weight: bold; color: #1e40af; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                    {otp}
                </div>
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                    ⚠️ This code expires in 10 minutes. If you didn't request this, please ignore this email.
                </p>
            </div>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 14px; line-height: 1.6;">
            <p>Need help? Contact our support team at <a href="mailto:cred.investigation@usa.com" style="color: #1e40af;">cred.investigation@usa.com</a></p>
            <p>© 2025 CRED - Crypto Regulatory Enforcement Division</p>
        </div>
    </body>
    </html>
    """
    
    try:
        await send_email(user_data.email, subject, body)
        
        # Send notification to admin
        admin_subject = "New User Registration - CRED"
        admin_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2 style="color: #1e40af;">New User Registration</h2>
            <p><strong>Name:</strong> {user_data.name}</p>
            <p><strong>Email:</strong> {user_data.email}</p>
            <p><strong>Phone:</strong> {user_data.phone or 'Not provided'}</p>
            <p><strong>Registration Time:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
            <p><strong>Status:</strong> Pending email verification</p>
            <hr>
            <p style="color: #64748b; font-size: 14px;">This is an automated notification from CRED system.</p>
        </body>
        </html>
        """
        
        await send_email(os.environ.get('EMAIL_TO', 'cred.investigation@usa.com'), admin_subject, admin_body)
        
        return {"message": "Registration successful! Please check your email for OTP verification."}
        
    except Exception as e:
        # Delete user if email fails
        await db.users.delete_one({"_id": user_doc["_id"]})
        raise HTTPException(status_code=500, detail="Failed to send verification email")

@api_router.post("/verify-otp")
async def verify_otp(verification: OTPVerification):
    """Verify OTP and activate user account"""
    # Check OTP in temp storage
    otp_record = await db.temp_otps.find_one({
        "email": verification.email,
        "otp": verification.otp,
        "type": "registration",
        "expires_at": {"$gt": datetime.utcnow()}
    })
    
    if not otp_record:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    # Update user as verified
    result = await db.users.update_one(
        {"email": verification.email},
        {"$set": {"is_verified": True}}
    )
    
    if result.modified_count:
        # Clean up OTP
        await db.temp_otps.delete_one({"email": verification.email, "type": "registration"})
        return {"message": "Account verified successfully!"}
    else:
        raise HTTPException(status_code=400, detail="Failed to verify account")

@api_router.post("/resend-otp")
async def resend_otp(request: dict):
    """Resend OTP for email verification"""
    email = request.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    
    # Check if user exists and is unverified
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.get("is_verified"):
        raise HTTPException(status_code=400, detail="Account already verified")
    
    # Generate new 6-digit OTP
    totp = pyotp.TOTP(user["otp_secret"])
    otp = totp.now()
    otp = f"{int(otp) % 1000000:06d}"
    
    # Update OTP with new expiration
    await db.temp_otps.update_one(
        {"email": email, "type": "registration"},
        {"$set": {
            "otp": otp,
            "expires_at": datetime.utcnow() + timedelta(minutes=10)
        }},
        upsert=True
    )
    
    # Send new OTP email
    subject = "CRED Email Verification - New OTP"
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🛡️ CRED</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">New Verification Code</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #1e40af; margin: 0 0 20px 0;">New Verification Code</h2>
            <p style="color: #64748b; line-height: 1.6;">
                Dear {user["name"]},
            </p>
            <p style="color: #64748b; line-height: 1.6;">
                You requested a new verification code for your CRED account. Please use the code below:
            </p>
            
            <div style="background: white; border: 2px solid #1e40af; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
                <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">Verification Code</p>
                <div style="font-size: 32px; font-weight: bold; color: #1e40af; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                    {otp}
                </div>
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                    ⚠️ This code expires in 10 minutes. Complete verification to activate your account.
                </p>
            </div>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 14px; line-height: 1.6;">
            <p>Questions? Contact us at <a href="mailto:cred.investigation@usa.com" style="color: #1e40af;">cred.investigation@usa.com</a></p>
            <p>© 2025 CRED - Crypto Regulatory Enforcement Division</p>
        </div>
    </body>
    </html>
    """
    
    try:
        await send_email(email, subject, body)
        return {"message": "New verification code sent to your email"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send verification email")

@api_router.post("/login")
async def login_user(login_data: UserLogin):
    """User login"""
    user = await db.users.find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not user["is_verified"]:
        raise HTTPException(status_code=401, detail="Account not verified")
    
    # Create JWT token
    token = create_jwt_token({"user_id": user["_id"], "email": user["email"]})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["_id"],
            "name": user["name"],
            "email": user["email"],
            "is_admin": user.get("is_admin", False),
            "total_investment": user.get("total_investment", 0),
            "total_returns": user.get("total_returns", 0),
            "active_investments": user.get("active_investments", 0)
        }
    }

@api_router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    """Send password reset OTP to user's email"""
    # Check if user exists
    user = await db.users.find_one({"email": request.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Generate 6-digit OTP
    totp = pyotp.TOTP(user["otp_secret"])
    otp = totp.now()
    otp = f"{int(otp) % 1000000:06d}"
    
    # Store OTP for password reset (expires in 10 minutes)
    await db.temp_otps.insert_one({
        "email": request.email,
        "otp": otp,
        "type": "password_reset",
        "expires_at": datetime.utcnow() + timedelta(minutes=10)
    })
    
    # Send password reset email
    subject = "CRED Password Reset - OTP Required"
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🔑 CRED</h1>
            <p style="color: #fed7aa; margin: 10px 0 0 0; font-size: 16px;">Password Reset Request</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #f59e0b; margin: 0 0 20px 0;">Password Reset Request</h2>
            <p style="color: #64748b; line-height: 1.6;">
                Dear {user["name"]},
            </p>
            <p style="color: #64748b; line-height: 1.6;">
                We received a request to reset your CRED account password. Please use the following OTP to reset your password:
            </p>
            
            <div style="background: white; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
                <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">Reset Code</p>
                <div style="font-size: 32px; font-weight: bold; color: #f59e0b; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                    {otp}
                </div>
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                    ⚠️ This code expires in 10 minutes. If you didn't request this password reset, please ignore this email.
                </p>
            </div>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 14px; line-height: 1.6;">
            <p>Need help? Contact our support team at <a href="mailto:cred.investigation@usa.com" style="color: #f59e0b;">cred.investigation@usa.com</a></p>
            <p>© 2025 CRED - Crypto Regulatory Enforcement Division</p>
        </div>
    </body>
    </html>
    """
    
    await send_email(request.email, subject, body)
    
    return {"message": "Password reset instructions sent to your email"}

@api_router.post("/reset-password")
async def reset_password(request: PasswordResetRequest):
    """Reset user password with OTP verification"""
    # Check OTP
    otp_record = await db.temp_otps.find_one({
        "email": request.email,
        "otp": request.otp,
        "type": "password_reset",
        "expires_at": {"$gt": datetime.utcnow()}
    })
    
    if not otp_record:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    
    # Update password
    password_hash = hash_password(request.new_password)
    result = await db.users.update_one(
        {"email": request.email},
        {"$set": {"password_hash": password_hash}}
    )
    
    if result.modified_count:
        # Clean up OTP
        await db.temp_otps.delete_one({"email": request.email, "type": "password_reset"})
        
        # Send confirmation email
        user = await db.users.find_one({"email": request.email})
        subject = "CRED Password Reset Successful"
        body = f"""
        <html>
        <body>
            <h2>CRED Password Reset Successful</h2>
            <p>Dear {user["name"]},</p>
            <p>Your CRED account password has been successfully reset.</p>
            <p>You can now login with your new password.</p>
            <p>If you didn't perform this action, please contact our support team immediately.</p>
            <br>
            <p>Best regards,<br>CRED Security Team</p>
        </body>
        </html>
        """
        
        await send_email(request.email, subject, body)
        return {"message": "Password reset successful. You can now login with your new password."}
    
    raise HTTPException(status_code=400, detail="Failed to reset password")

@api_router.get("/user/profile")
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    """Get user profile"""
    return {
        "id": current_user["_id"],
        "name": current_user["name"],
        "email": current_user["email"],
        "phone": current_user.get("phone"),
        "is_verified": current_user["is_verified"],
        "total_investment": current_user.get("total_investment", 0),
        "total_returns": current_user.get("total_returns", 0),
        "active_investments": current_user.get("active_investments", 0),
        "created_at": current_user["created_at"]
    }

@api_router.post("/reports/submit")
async def submit_report(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    priority: str = Form("medium"),
    attachments: List[UploadFile] = File(None),
    current_user: dict = Depends(get_current_user)
):
    """Submit investigation report with attachments"""
    
    # Create report document
    report_doc = {
        "_id": str(uuid.uuid4()),
        "user_id": current_user["_id"],
        "user_name": current_user["name"],
        "user_email": current_user["email"],
        "title": title,
        "description": description,
        "category": category,
        "priority": priority,
        "status": "submitted",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "attachments": [],
        "conversation": []
    }
    
    # Handle file attachments
    attachment_paths = []
    if attachments:
        for attachment in attachments:
            if attachment.filename:
                # Create uploads directory if it doesn't exist
                upload_dir = Path("/app/backend/uploads")
                upload_dir.mkdir(exist_ok=True)
                
                # Save file
                file_path = upload_dir / f"{report_doc['_id']}_{attachment.filename}"
                with open(file_path, "wb") as buffer:
                    content = await attachment.read()
                    buffer.write(content)
                
                report_doc["attachments"].append({
                    "filename": attachment.filename,
                    "path": str(file_path),
                    "size": len(content)
                })
                attachment_paths.append(str(file_path))
    
    # Save to database
    await db.reports.insert_one(report_doc)
    
    # Send email notification
    subject = f"New CRED Investigation Report: {title}"
    body = f"""
    <html>
    <body>
        <h2>New Investigation Report Submitted</h2>
        <p><strong>Report ID:</strong> {report_doc['_id']}</p>
        <p><strong>Submitted by:</strong> {current_user['name']} ({current_user['email']})</p>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Priority:</strong> {priority}</p>
        <p><strong>Description:</strong></p>
        <p>{description}</p>
        <p><strong>Attachments:</strong> {len(attachment_paths)} files</p>
        <p><strong>Submitted:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
        <br>
        <p>Please review and respond via the CRED admin panel.</p>
    </body>
    </html>
    """
    
    await send_email(os.environ['EMAIL_TO'], subject, body)
    
    return {"message": "Report submitted successfully", "report_id": report_doc["_id"]}

@api_router.get("/reports/my-reports")
async def get_user_reports(current_user: dict = Depends(get_current_user)):
    """Get user's submitted reports"""
    reports = await db.reports.find({"user_id": current_user["_id"]}).to_list(1000)
    return {"reports": reports}

@api_router.post("/reports/reply")
async def reply_to_report(
    reply_data: ReportReply,
    current_user: dict = Depends(get_current_user)
):
    """Reply to a report (continues conversation)"""
    report = await db.reports.find_one({"_id": reply_data.report_id, "user_id": current_user["_id"]})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Add reply to conversation
    conversation_entry = {
        "id": str(uuid.uuid4()),
        "sender": "user",
        "sender_name": current_user["name"],
        "message": reply_data.message,
        "timestamp": datetime.utcnow()
    }
    
    await db.reports.update_one(
        {"_id": reply_data.report_id},
        {
            "$push": {"conversation": conversation_entry},
            "$set": {"updated_at": datetime.utcnow()}
        }
    )
    
    # Send email notification
    subject = f"CRED Report Reply: {report['title']}"
    body = f"""
    <html>
    <body>
        <h2>Report Reply Received</h2>
        <p><strong>Report ID:</strong> {reply_data.report_id}</p>
        <p><strong>From:</strong> {current_user['name']} ({current_user['email']})</p>
        <p><strong>Message:</strong></p>
        <p>{reply_data.message}</p>
        <p><strong>Time:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
    </body>
    </html>
    """
    
    await send_email(os.environ['EMAIL_TO'], subject, body)
    
    return {"message": "Reply sent successfully"}

@api_router.get("/investment/packages")
async def get_investment_packages():
    """Get available investment packages"""
    packages = [
        {
            "id": "standard",
            "name": "Standard Enforcement Fund",
            "description": "Basic cryptocurrency enforcement and recovery investment with solid returns.",
            "min_investment": 10000,
            "apy": "15%",
            "duration": "60 days",
            "features": ["Basic enforcement support", "Monthly reports", "Email support"]
        },
        {
            "id": "premium",
            "name": "Premium Crypto Recovery",
            "description": "Advanced crypto recovery operations with enhanced legal support and faster processing.",
            "min_investment": 50000,
            "apy": "22%",
            "duration": "60 days",
            "features": ["Priority case handling", "Weekly reports", "Phone & chat support", "Basic legal consultation"]
        },
        {
            "id": "elite",
            "name": "ELITE ENFORCEMENT FUND",
            "description": "Ultra-premium crypto enforcement package with direct lawyer access, 24/7 priority support, and maximum APY returns.",
            "min_investment": 100000,
            "apy": "40%",
            "duration": "60 days",
            "premium": True,
            "features": [
                "Direct chat with CRED lawyers 24/7",
                "Priority enforcement processing",
                "Daily detailed reports",
                "Personal case manager assigned",
                "Dedicated hotline access",
                "VIP legal consultation included",
                "Emergency response team",
                "Highest APY guaranteed"
            ]
        }
    ]
    
    # Add crypto addresses
    crypto_addresses = {
        "btc": os.environ['BTC_ADDRESS'],
        "eth": os.environ['ETH_ADDRESS'],
        "usdt": os.environ['USDT_ADDRESS']
    }
    
    return {"packages": packages, "crypto_addresses": crypto_addresses}

@api_router.post("/investment/invest")
async def create_investment(
    investment_data: InvestmentRequest,
    current_user: dict = Depends(get_current_user)
):
    """Create new investment"""
    
    # Get package details
    packages = await get_investment_packages()
    package = next((p for p in packages["packages"] if p["id"] == investment_data.package_id), None)
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    if investment_data.amount < package["min_investment"]:
        raise HTTPException(status_code=400, detail=f"Minimum investment is ${package['min_investment']}")
    
    # Create investment record
    investment_doc = {
        "_id": str(uuid.uuid4()),
        "user_id": current_user["_id"],
        "package_id": investment_data.package_id,
        "package_name": package["name"],
        "amount": investment_data.amount,
        "crypto_type": investment_data.crypto_type,
        "transaction_hash": investment_data.transaction_hash,
        "status": "pending_verification",
        "created_at": datetime.utcnow(),
        "apy": package["apy"],
        "returns": 0
    }
    
    # Save to database
    await db.investments.insert_one(investment_doc)
    
    # Send confirmation email to user
    subject = "Investment Submitted - CRED"
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">💰 CRED</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Investment Submitted</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h2 style="color: #059669; margin: 0 0 20px 0;">Investment Details</h2>
            <p style="color: #64748b; line-height: 1.6;">
                Dear {current_user["name"]},
            </p>
            <p style="color: #64748b; line-height: 1.6;">
                Your investment has been successfully submitted and is awaiting verification.
            </p>
            
            <div style="background: white; border: 2px solid #059669; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <div style="grid-template-columns: 1fr 1fr; display: grid; gap: 10px;">
                    <div><strong>Package:</strong> {package["name"]}</div>
                    <div><strong>Amount:</strong> ${investment_data.amount:,.2f}</div>
                    <div><strong>Cryptocurrency:</strong> {investment_data.crypto_type.upper()}</div>
                    <div><strong>Expected APY:</strong> {package["apy"]}</div>
                </div>
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                    ⏳ Your investment is under review. You'll receive an email confirmation once verified (typically within 24 hours).
                </p>
            </div>
        </div>
        
        <div style="text-align: center; color: #64748b; font-size: 14px; line-height: 1.6;">
            <p>Questions? Contact us at <a href="mailto:cred.investigation@usa.com" style="color: #059669;">cred.investigation@usa.com</a></p>
            <p>© 2025 CRED - Crypto Regulatory Enforcement Division</p>
        </div>
    </body>
    </html>
    """
    
    try:
        await send_email(current_user["email"], subject, body)
        
        # Send notification to admin
        admin_subject = "New Investment Submitted - CRED"
        admin_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2 style="color: #059669;">New Investment Submitted</h2>
            <p><strong>User:</strong> {current_user["name"]} ({current_user["email"]})</p>
            <p><strong>Package:</strong> {package["name"]}</p>
            <p><strong>Amount:</strong> ${investment_data.amount:,.2f}</p>
            <p><strong>Cryptocurrency:</strong> {investment_data.crypto_type.upper()}</p>
            <p><strong>Transaction Hash:</strong> {investment_data.transaction_hash}</p>
            <p><strong>Submission Time:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
            <p><strong>Status:</strong> Pending verification</p>
            <hr>
            <p style="color: #64748b; font-size: 14px;">Login to admin portal to verify this investment.</p>
        </body>
        </html>
        """
        
        await send_email(os.environ.get('EMAIL_TO', 'cred.investigation@usa.com'), admin_subject, admin_body)
        
    except Exception as e:
        logger.error(f"Failed to send investment notification emails: {e}")
        # Don't fail the investment if email fails
        
    return {"message": "Investment submitted successfully. You will receive confirmation once verified."}

@api_router.get("/investment/my-investments")
async def get_user_investments(current_user: dict = Depends(get_current_user)):
    """Get user's investments"""
    investments = await db.investments.find({"user_id": current_user["_id"]}).to_list(1000)
    return {"investments": investments}

@api_router.post("/investment/withdraw")
async def request_withdrawal(
    withdraw_data: WithdrawRequest,
    current_user: dict = Depends(get_current_user)
):
    """Request withdrawal"""
    
    # Check if user has sufficient balance
    user_investments = await db.investments.find({
        "user_id": current_user["_id"],
        "status": "active"
    }).to_list(1000)
    
    total_available = sum(inv.get("returns", 0) for inv in user_investments)
    
    if withdraw_data.amount > total_available:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    
    # Create withdrawal request
    withdrawal_doc = {
        "_id": str(uuid.uuid4()),
        "user_id": current_user["_id"],
        "amount": withdraw_data.amount,
        "crypto_type": withdraw_data.crypto_type,
        "wallet_address": withdraw_data.wallet_address,
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    
    await db.withdrawals.insert_one(withdrawal_doc)
    
    # Send notification email
    subject = f"CRED Withdrawal Request - ${withdraw_data.amount}"
    body = f"""
    <html>
    <body>
        <h2>Withdrawal Request Submitted</h2>
        <p>Dear {current_user['name']},</p>
        <p>Your withdrawal request has been submitted and is being processed.</p>
        <p><strong>Withdrawal Details:</strong></p>
        <ul>
            <li>Amount: ${withdraw_data.amount:,.2f}</li>
            <li>Crypto Type: {withdraw_data.crypto_type.upper()}</li>
            <li>Wallet Address: {withdraw_data.wallet_address}</li>
            <li>Request ID: {withdrawal_doc['_id']}</li>
        </ul>
        <p>Processing time: 1-3 business days</p>
        <br>
        <p>Best regards,<br>CRED Financial Team</p>
    </body>
    </html>
    """
    
    await send_email(current_user["email"], subject, body)
    await send_email(os.environ['EMAIL_TO'], f"Withdrawal Request: ${withdraw_data.amount}", body)
    
    return {"message": "Withdrawal request submitted successfully", "request_id": withdrawal_doc["_id"]}

# Admin Routes
@api_router.get("/admin/dashboard")
async def admin_dashboard(admin_user: dict = Depends(get_current_admin)):
    """Admin dashboard statistics"""
    
    # Get statistics
    total_users = await db.users.count_documents({})
    verified_users = await db.users.count_documents({"is_verified": True})
    total_reports = await db.reports.count_documents({})
    pending_reports = await db.reports.count_documents({"status": "submitted"})
    total_investments = await db.investments.count_documents({})
    pending_investments = await db.investments.count_documents({"status": "pending_verification"})
    total_withdrawals = await db.withdrawals.count_documents({})
    pending_withdrawals = await db.withdrawals.count_documents({"status": "pending"})
    
    # Calculate total investment amount
    investment_pipeline = [
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}}
    ]
    investment_result = await db.investments.aggregate(investment_pipeline).to_list(1)
    total_investment_amount = investment_result[0]["total"] if investment_result else 0
    
    return {
        "users": {
            "total": total_users,
            "verified": verified_users,
            "unverified": total_users - verified_users
        },
        "reports": {
            "total": total_reports,
            "pending": pending_reports
        },
        "investments": {
            "total": total_investments,
            "pending": pending_investments,
            "total_amount": total_investment_amount
        },
        "withdrawals": {
            "total": total_withdrawals,
            "pending": pending_withdrawals
        }
    }

@api_router.get("/admin/reports")
async def get_all_reports(admin_user: dict = Depends(get_current_admin)):
    """Get all reports for admin"""
    reports = await db.reports.find({}).sort("created_at", -1).to_list(1000)
    return {"reports": reports}

@api_router.post("/admin/reports/update")
async def update_report_status(
    update_data: AdminReportUpdate,
    admin_user: dict = Depends(get_current_admin)
):
    """Update report status and add admin notes"""
    
    report = await db.reports.find_one({"_id": update_data.report_id})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Add admin response to conversation
    conversation_entry = {
        "id": str(uuid.uuid4()),
        "sender": "admin",
        "sender_name": admin_user["name"],
        "message": update_data.admin_notes,
        "timestamp": datetime.utcnow()
    }
    
    await db.reports.update_one(
        {"_id": update_data.report_id},
        {
            "$set": {
                "status": update_data.status,
                "updated_at": datetime.utcnow()
            },
            "$push": {"conversation": conversation_entry}
        }
    )
    
    # Send email to user
    user = await db.users.find_one({"_id": report["user_id"]})
    if user:
        subject = f"CRED Report Update: {report['title']}"
        body = f"""
        <html>
        <body>
            <h2>Report Status Update</h2>
            <p>Dear {user['name']},</p>
            <p>Your report has been updated by our investigation team.</p>
            <p><strong>Report ID:</strong> {update_data.report_id}</p>
            <p><strong>Status:</strong> {update_data.status.title()}</p>
            <p><strong>Admin Response:</strong></p>
            <p>{update_data.admin_notes}</p>
            <p>You can reply to this investigation through your CRED dashboard.</p>
            <br>
            <p>Best regards,<br>CRED Investigation Team</p>
        </body>
        </html>
        """
        
        await send_email(user["email"], subject, body)
    
    return {"message": "Report updated successfully"}

@api_router.get("/admin/users")
async def get_all_users(admin_user: dict = Depends(get_current_admin)):
    """Get all users for admin"""
    users = await db.users.find({}, {"password_hash": 0, "otp_secret": 0}).to_list(1000)
    return {"users": users}

@api_router.get("/admin/investments")
async def get_all_investments(admin_user: dict = Depends(get_current_admin)):
    """Get all investments for admin"""
    investments = await db.investments.find({}).sort("created_at", -1).to_list(1000)
    return {"investments": investments}

@api_router.post("/admin/investments/verify/{investment_id}")
async def verify_investment(
    investment_id: str,
    admin_user: dict = Depends(get_current_admin)
):
    """Verify and activate investment"""
    
    investment = await db.investments.find_one({"_id": investment_id})
    if not investment:
        raise HTTPException(status_code=404, detail="Investment not found")
    
    # Calculate expected returns (APY for 60 days)
    apy_decimal = float(investment["apy"].rstrip('%')) / 100
    expected_returns = investment["amount"] * (apy_decimal * (60/365))
    maturity_date = datetime.utcnow() + timedelta(days=60)
    
    await db.investments.update_one(
        {"_id": investment_id},
        {
            "$set": {
                "status": "active",
                "verified_at": datetime.utcnow(),
                "expected_returns": expected_returns,
                "returns": expected_returns,
                "maturity_date": maturity_date
            }
        }
    )
    
    # Update user returns
    await db.users.update_one(
        {"_id": investment["user_id"]},
        {"$inc": {"total_returns": expected_returns}}
    )
    
    # Send confirmation to user
    user = await db.users.find_one({"_id": investment["user_id"]})
    if user:
        subject = f"CRED Investment Verified - {investment['package_name']}"
        body = f"""
        <html>
        <body>
            <h2>Investment Verified and Activated</h2>
            <p>Dear {user['name']},</p>
            <p>Your investment has been verified and is now active!</p>
            <p><strong>Investment Details:</strong></p>
            <ul>
                <li>Package: {investment['package_name']}</li>
                <li>Amount: ${investment['amount']:,.2f}</li>
                <li>Expected Returns: ${expected_returns:,.2f}</li>
                <li>APY: {investment['apy']}</li>
                <li>Maturity Date: {maturity_date.strftime('%Y-%m-%d')}</li>
            </ul>
            <p>You can track your investment progress in your CRED dashboard.</p>
            <br>
            <p>Best regards,<br>CRED Investment Team</p>
        </body>
        </html>
        """
        
        await send_email(user["email"], subject, body)
    
    return {"message": "Investment verified successfully"}

# Initialize admin user
@app.on_event("startup")
async def create_admin_user():
    """Create default admin user if it doesn't exist"""
    admin_email = os.environ.get('ADMIN_EMAIL', 'admin@cred.gov')
    admin_exists = await db.users.find_one({"email": admin_email})
    
    if not admin_exists:
        admin_doc = {
            "_id": str(uuid.uuid4()),
            "name": "CRED Administrator",
            "email": admin_email,
            "phone": "+1-800-CRYPTO-1",
            "password_hash": hash_password(os.environ.get('ADMIN_PASSWORD', 'CredAdmin2025!')),
            "is_verified": True,
            "is_admin": True,
            "otp_secret": pyotp.random_base32(),
            "created_at": datetime.utcnow(),
            "total_investment": 0.0,
            "total_returns": 0.0,
            "active_investments": 0
        }
        
        await db.users.insert_one(admin_doc)
        logger.info("Admin user created successfully")

# Include router
app.include_router(api_router)

# Static files serving for production deployment
frontend_build_path = os.environ.get('FRONTEND_BUILD_PATH', '../frontend/build')
if os.path.exists(frontend_build_path):
    app.mount("/static", StaticFiles(directory=f"{frontend_build_path}/static"), name="static")
    
    @app.get("/", response_class=FileResponse)
    async def serve_frontend():
        return FileResponse(f"{frontend_build_path}/index.html")
    
    @app.get("/{path:path}", response_class=FileResponse)
    async def serve_frontend_routes(path: str):
        # Serve static files directly
        if path.startswith("static/"):
            file_path = f"{frontend_build_path}/{path}"
            if os.path.exists(file_path):
                return FileResponse(file_path)
        
        # For all other routes, serve the React app
        return FileResponse(f"{frontend_build_path}/index.html")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)