const BRAND_COLOR = "#890eee";
const LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png";

/* =========================================
   ✅ Withdrawal Approved (Paid)
========================================= */
export const withdrawalApprovedTemplate = ({
  name,
  amount,
}) => {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:${BRAND_COLOR}; padding:25px;">
                <img src="${LOGO_URL}" alt="Logo" width="120" style="display:block;" />
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <h2 style="color:${BRAND_COLOR}; margin-top:0;">
                  Withdrawal Approved 🎉
                </h2>

                <p>Hello <strong>${name}</strong>,</p>

                <p>
                  Great news! Your withdrawal request of 
                  <strong>$${amount}</strong> has been 
                  <strong>approved and processed successfully</strong>.
                </p>

                <p>
                  The funds should reflect in your selected payment method shortly.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="https://your-domain.com/dashboard"
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
                    View Dashboard
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  If you did not request this withdrawal, please contact support immediately.
                </p>
              </td>
            </tr>

            <!-- Footer -->
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

/* =========================================
   ❌ Withdrawal Rejected
========================================= */
export const withdrawalRejectedTemplate = ({
  name,
  amount,
  reason,
}) => {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:${BRAND_COLOR}; padding:25px;">
                <img src="${LOGO_URL}" alt="Logo" width="120" style="display:block;" />
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <h2 style="color:${BRAND_COLOR}; margin-top:0;">
                  Withdrawal Rejected ❌
                </h2>

                <p>Hello <strong>${name}</strong>,</p>

                <p>
                  Unfortunately, your withdrawal request of 
                  <strong>$${amount}</strong> has been rejected.
                </p>

                ${
                  reason
                    ? `<p><strong>Reason:</strong> ${reason}</p>`
                    : `<p>Please review your account details and try again.</p>`
                }

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="https://your-domain.com/withdraw"
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
                    Try Again
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  If you believe this is a mistake, please contact support.
                </p>
              </td>
            </tr>

            <!-- Footer -->
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