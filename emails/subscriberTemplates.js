const BRAND_COLOR = "#890eee";
const LOGO_URL = "http://localhost:3000/logo.png";

export const subscriberNewsletterTemplate = ({ name }) => {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            
            <tr>
              <td align="center" style="background:${BRAND_COLOR}; padding:25px;">
                <img src="${LOGO_URL}" alt="Logo" width="120" />
              </td>
            </tr>

            <tr>
              <td style="padding:30px;">
                <h2 style="color:${BRAND_COLOR}; margin-top:0;">
                  Hello ${name} 👋
                </h2>

                <p>
                  Thank you for subscribing to our newsletter!
                </p>

                <p>
                  We’re excited to share updates, offers, and exclusive content with you.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="http://localhost:3000"
                    style="
                      background:${BRAND_COLOR};
                      color:#ffffff;
                      padding:14px 28px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:bold;
                      display:inline-block;
                    "
                  >
                    Visit Website
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  Stay tuned for more exciting updates!
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="background:#f9f5ff; padding:15px; font-size:12px; color:#6b7280;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};