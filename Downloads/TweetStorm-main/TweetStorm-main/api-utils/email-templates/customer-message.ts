export const customerMessageTemplate = (
  email: string,
  subject: string,
  message: string
) => {
  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #1a73e8; color: #ffffff; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Message from Tweetstorm.ai</h1>
        </div>
        <div style="padding: 24px;">
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5; color: #333;">Hello Team,</p>
            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333;">You have received a new contact form submission from your website. Below are the details of the message:</p>
            
            <div style="background-color: #f9f9f9; border-left: 4px solid #1a73e8; border-radius: 4px; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 16px; line-height: 1.5;"><strong style="color: #555;">Customer Email:</strong> ${email}</p>
            </div>
            
            <div style="background-color: #f9f9f9; border-left: 4px solid #1a73e8; border-radius: 4px; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 16px; line-height: 1.5;"><strong style="color: #555;">Subject:</strong> ${subject}</p>
            </div>

            <div style="background-color: #f9f9f9; border-left: 4px solid #1a73e8; border-radius: 4px; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px; font-size: 16px; line-height: 1.5;"><strong style="color: #555;">Message:</strong></p>
                <p style="margin: 0; font-size: 16px; line-height: 1.5;">${message}</p>
            </div>
        </div>
    </div>
</div>`;
};
