# PowerShell script to set SMTP environment variables for Windows
# Run this in PowerShell before starting your Spring Boot application

Write-Host "Setting up SMTP environment variables..." -ForegroundColor Green
Write-Host ""
Write-Host "Please enter your Gmail credentials:" -ForegroundColor Yellow
Write-Host "(You need a Gmail App Password, not your regular password)" -ForegroundColor Yellow
Write-Host "Get App Password from: https://myaccount.google.com/apppasswords" -ForegroundColor Cyan
Write-Host ""

$email = Read-Host "Enter your Gmail address (e.g., yourname@gmail.com)"
$appPassword = Read-Host "Enter your Gmail App Password (16 characters)" -AsSecureString

# Convert secure string to plain text
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($appPassword)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Set environment variables for current session
$env:SMTP_USER = $email
$env:SMTP_PASS = $plainPassword
$env:SMTP_HOST = "smtp.gmail.com"
$env:SMTP_PORT = "587"

Write-Host ""
Write-Host "✓ Environment variables set successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "SMTP_USER: $email" -ForegroundColor Gray
Write-Host "SMTP_PASS: ********" -ForegroundColor Gray
Write-Host "SMTP_HOST: smtp.gmail.com" -ForegroundColor Gray
Write-Host "SMTP_PORT: 587" -ForegroundColor Gray
Write-Host ""
Write-Host "Now start your Spring Boot application in this same PowerShell window." -ForegroundColor Yellow
Write-Host "The email will work for this session only." -ForegroundColor Yellow
Write-Host ""
Write-Host "To make it permanent, add these to your system environment variables." -ForegroundColor Cyan

