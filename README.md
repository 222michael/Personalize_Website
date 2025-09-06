# Portfolio Website - Contact Form Setup

## EmailJS Setup Instructions

To enable the contact form functionality that sends emails when users submit messages, follow these steps:

1. **Create an EmailJS Account**:
   - Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
   - The free tier allows 200 emails per month

2. **Email Service Setup**:
   - Your Gmail service has already been connected with the ID: `service_23k0f57`
   - This is already configured in the script.js file

3. **Create an Email Template**:
   - Go to "Email Templates" in your dashboard
   - Create a new template (or use an existing one)
   - Design your email template using the following variables:
     - `{{from_name}}` - Sender's name
     - `{{email_id}}` - Sender's email
     - `{{phone}}` - Sender's phone number
     - `{{subject}}` - Email subject
     - `{{message}}` - Message content
   - Note the Template ID after creating your template

4. **Complete the JavaScript Code Setup**:
   - Open `script.js` in your project
   - Replace the remaining placeholder values:
     ```javascript
     // Replace "YOUR_PUBLIC_KEY" with your actual EmailJS Public Key
     // Find this in the Account section of your EmailJS dashboard
     emailjs.init("YOUR_PUBLIC_KEY");
     
     // Replace "YOUR_TEMPLATE_ID" with your actual EmailJS Template ID
     // This is the ID of the template you created in step 3
     emailjs.send('service_23k0f57', 'YOUR_TEMPLATE_ID', templateParams)
     ```

5. **Test the Form**:
   - Open your portfolio website
   - Fill out the contact form and submit
   - Check your email to confirm receipt

## Security Note

The current implementation uses client-side JavaScript to send emails, which means your EmailJS User ID, Service ID, and Template ID are visible in the source code. This is acceptable for small personal projects, but for added security in production environments, consider implementing server-side email handling.

## Troubleshooting

If emails are not being sent:

1. Check browser console for errors
2. Verify your EmailJS credentials are correct
3. Ensure your email service is properly connected in EmailJS dashboard
4. Check if you've reached the monthly email limit on your EmailJS plan