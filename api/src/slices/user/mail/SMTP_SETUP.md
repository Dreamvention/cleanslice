# SMTP Configuration Guide

## Environment Variables

Add these to your `.env` file:

```bash
# SMTP Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_SECURE=false
SMTP_FROM_EMAIL=noreply@yourdomain.com
SMTP_FROM_NAME=Your App Name
```

## Popular SMTP Providers

### 1. **Gmail (Google Workspace)**

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password, not regular password
```

**Setup Steps:**

1. Enable 2-factor authentication
2. Generate App Password: Google Account → Security → App Passwords
3. Use the generated 16-character password

### 2. **Outlook/Hotmail**

```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### 3. **Yahoo Mail**

```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### 4. **SendGrid**

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### 5. **Mailgun**

```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

### 6. **Amazon SES (SMTP Interface)**

```bash
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

### 7. **MailHog (Local Development)**

```bash
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
```

## Security Best Practices

### 1. **Use App Passwords**

- Never use your main account password
- Generate app-specific passwords
- Rotate passwords regularly

### 2. **Environment Variables**

```bash
# Production
SMTP_HOST=${SMTP_HOST}
SMTP_PORT=${SMTP_PORT}
SMTP_USER=${SMTP_USER}
SMTP_PASS=${SMTP_PASS}

# Development
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
```

### 3. **SSL/TLS Configuration**

```bash
# For port 587 (STARTTLS)
SMTP_SECURE=false

# For port 465 (SSL)
SMTP_SECURE=true
SMTP_PORT=465
```

## Testing Your Configuration

### 1. **Test Connection**

```bash
# Test SMTP connection
telnet your-smtp-host 587
```

### 2. **Test Email Sending**

```typescript
// Test in your application
const testEmail = {
  recipientEmail: 'test@example.com',
  subject: 'Test Email',
  content: '<h1>Test</h1><p>This is a test email.</p>',
};

await mailService.sendMail(testEmail);
```

### 3. **Check Logs**

```bash
# Monitor your application logs
tail -f logs/app.log | grep SMTP
```

## Troubleshooting

### Common Issues

#### 1. **Authentication Failed (535)**

- Check username/password
- Verify app password is correct
- Ensure 2FA is enabled (for Gmail)

#### 2. **Connection Timeout**

- Check firewall settings
- Verify SMTP host and port
- Try different ports (587, 465, 25)

#### 3. **SSL/TLS Errors**

- Set `SMTP_SECURE` correctly
- Check certificate validity
- Try `rejectUnauthorized: false` (development only)

#### 4. **Rate Limiting**

- Respect provider limits
- Implement retry logic
- Use connection pooling

## Development Setup

### 1. **MailHog (Recommended)**

```bash
# Install MailHog
brew install mailhog  # macOS
# or
go install github.com/mailhog/MailHog@latest

# Start MailHog
mailhog

# Access web interface
open http://localhost:8025
```

### 2. **Docker MailHog**

```yaml
# docker-compose.yml
services:
  mailhog:
    image: mailhog/mailhog
    ports:
      - '1025:1025' # SMTP
      - '8025:8025' # Web UI
```

### 3. **Environment Configuration**

```bash
# .env.development
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
SMTP_FROM_EMAIL=test@localhost
SMTP_FROM_NAME=Development App
```

## Production Checklist

- [ ] Use app passwords, not account passwords
- [ ] Enable SSL/TLS encryption
- [ ] Set up proper DNS records (SPF, DKIM, DMARC)
- [ ] Monitor delivery rates and bounces
- [ ] Implement retry logic for failed emails
- [ ] Set up email templates
- [ ] Configure bounce and complaint handling
- [ ] Test with multiple email clients

## Monitoring

### 1. **Delivery Rates**

- Monitor successful vs failed sends
- Track bounce rates
- Check spam folder placement

### 2. **Performance**

- Connection pool usage
- Email queue processing
- Response times

### 3. **Security**

- Failed authentication attempts
- Rate limit violations
- SSL certificate expiration
