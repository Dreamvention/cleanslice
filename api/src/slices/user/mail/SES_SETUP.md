# AWS SES Setup Guide

## 1. AWS SES Configuration

### Step 1: Verify Your Domain

1. Go to AWS SES Console
2. Navigate to "Verified identities"
3. Click "Create identity"
4. Choose "Domain" and enter your domain
5. Follow DNS verification steps

### Step 2: Request Production Access (if needed)

- By default, SES is in sandbox mode
- Request production access if you need to send to unverified emails
- Go to "Account dashboard" → "Request production access"

### Step 3: Create IAM User/Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "*"
    }
  ]
}
```

## 2. Environment Variables

Add these to your `.env` file:

```bash
# Mail Provider (ses or smtp)
MAIL_PROVIDER=ses

# AWS SES Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
SES_FROM_EMAIL=noreply@yourdomain.com

# Remove or comment out SMTP variables
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASS=
# SMTP_SECURE=
```

## 3. Install Dependencies

```bash
npm install @aws-sdk/client-ses
```

## 4. Benefits of AWS SES

### Cost Savings

- **Free Tier**: 62,000 emails/month when sent from EC2
- **Pricing**: $0.10 per 1,000 emails
- **No monthly fees**

### Reliability

- 99.9% uptime SLA
- Built-in bounce and complaint handling
- Automatic scaling

### Integration

- Native AWS integration
- Unified billing and monitoring
- IAM-based security

## 5. Testing

### Test Email Sending

```bash
# Test via AWS CLI
aws ses send-email \
  --from "noreply@yourdomain.com" \
  --destination "ToAddresses=test@example.com" \
  --message "Subject={Data=Test},Body={Text={Data=Hello}}"
```

### Monitor in AWS Console

- Go to SES Console → "Sending statistics"
- Check bounce and complaint rates
- Monitor delivery success

## 6. Advanced Features

### SES Templates

```typescript
// Use SES templates for consistent emails
const templateParams = {
  Template: 'EmailConfirmationTemplate',
  TemplateData: JSON.stringify({
    name: user.name,
    confirmationUrl: confirmationUrl,
  }),
};
```

### Bounce/Complaint Handling

- Already implemented in your `MailController`
- Automatically marks users with email errors
- Prevents sending to invalid addresses

## 7. Migration Steps

1. **Set up SES** (follow steps 1-3 above)
2. **Update environment variables**
3. **Test with a few emails**
4. **Monitor delivery rates**
5. **Switch `MAIL_PROVIDER=ses`**
6. **Remove SMTP configuration**

## 8. Troubleshooting

### Common Issues

- **Domain not verified**: Verify your domain in SES
- **Sandbox mode**: Request production access
- **IAM permissions**: Ensure SES permissions are granted
- **Region mismatch**: Use same region for SES and your app

### Error Handling

The new `SesMailGateway` includes proper error handling and logging to help debug issues.
