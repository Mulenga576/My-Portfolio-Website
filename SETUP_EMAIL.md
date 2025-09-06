# Email Setup Instructions

## 🚨 **Why emails aren't reaching mpikula@u.rochester.edu**

Your contact form saves submissions to Supabase but doesn't send email notifications. I've created the email functionality, but you need to complete the setup.

## 📧 **Setup Steps**

### 1. **Get Resend API Key**
- Go to [resend.com](https://resend.com) and create a free account
- Navigate to API Keys section
- Create a new API key and copy it

### 2. **Configure Supabase Environment Variables**
- Go to your Supabase project dashboard
- Navigate to Settings → Edge Functions
- Add environment variable:
  - Key: `RESEND_API_KEY`
  - Value: `your_resend_api_key_here`

### 3. **Verify Domain (Optional but Recommended)**
- In Resend dashboard, add your domain for better deliverability
- Update the `from` field in `/supabase/functions/resend/index.ts` to use your domain
- Current: `noreply@yourdomain.com` → Change to: `noreply@youractualdomain.com`

### 4. **Deploy the Edge Function**
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy the function
supabase functions deploy resend
```

### 5. **Test the Setup**
- Submit a test message through your contact form
- Check browser console for any errors
- Verify email arrives at mpikula@u.rochester.edu

## 🔧 **Alternative: Simple Email Service**

If Supabase Edge Functions seem complex, you can use a simpler approach with EmailJS:

1. Create account at [emailjs.com](https://emailjs.com)
2. Set up email service (Gmail, Outlook, etc.)
3. Update contact form to use EmailJS instead

## 📝 **Current Status**
- ✅ Contact form saves to database
- ✅ Email function created
- ❌ Email service not configured
- ❌ Edge function not deployed

## 🎯 **Next Steps**
1. Get Resend API key
2. Add it to Supabase environment variables
3. Deploy the edge function
4. Test email delivery
