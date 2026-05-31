export const kycApprovedTemplate = ({ name }) => {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#eef2ff; font-family:Inter,Segoe UI,Arial;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 10px;">

<table width="600" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg,#890eee,#6d28d9); padding:30px; text-align:center;">
  <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" width="70"/>
  <h1 style="color:#fff; margin:15px 0 5px; font-size:22px;">KYC Verified</h1>
  <p style="color:#e0d4ff; margin:0;">You're all set 🎉</p>
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:35px;">

<p style="font-size:16px;">Hi <strong>${name}</strong>,</p>

<p style="color:#444;">
Your KYC verification has been successfully completed.
</p>

<!-- Highlight Box -->
<div style="background:#ecfdf5; border:1px solid #10b981; padding:15px; border-radius:10px; margin:20px 0;">
  <strong style="color:#059669;">Status: Approved ✅</strong>
</div>

<p style="color:#555;">
You now have full access to all platform features including transactions, withdrawals, and more.
</p>

<!-- Button -->
<div style="text-align:center; margin:30px 0;">
  <a href="https://your-domain.com/dashboard"
    style="
      background:#890eee;
      color:#fff;
      padding:14px 28px;
      border-radius:8px;
      text-decoration:none;
      font-weight:600;
      box-shadow:0 6px 18px rgba(137,14,238,0.3);
      display:inline-block;
    ">
    Go to Dashboard →
  </a>
</div>

<p style="font-size:13px; color:#777;">
If this wasn’t you, please contact support immediately.
</p>

</td>
</tr>

<!-- Social -->
<tr>
<td align="center" style="padding:20px;">
  <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="22"/></a>
  <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="22"/></a>
  <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="22"/></a>
</td>
</tr>

<!-- Footer -->
<tr>
<td align="center" style="padding:20px; font-size:12px; color:#888;">
  © ${new Date().getFullYear()} Your Company <br/>
  <a href="#" style="color:#890eee; text-decoration:none;">Support</a> • 
  <a href="#" style="color:#890eee; text-decoration:none;">Privacy</a>
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

export const kycRejectedTemplate = ({ name, reason }) => {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#eef2ff; font-family:Inter,Segoe UI,Arial;">

<table width="100%">
<tr>
<td align="center" style="padding:40px 10px;">

<table width="600" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg,#890eee,#6d28d9); padding:30px; text-align:center;">
  <img src="https://cdn-icons-png.flaticon.com/512/753/753345.png" width="70"/>
  <h1 style="color:#fff; margin:15px 0 5px;">KYC Verification Failed</h1>
  <p style="color:#e0d4ff;">Action Required ⚠️</p>
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:35px;">

<p>Hi <strong>${name}</strong>,</p>

<p style="color:#444;">
Unfortunately, your KYC verification could not be completed.
</p>

<!-- Highlight Box -->
<div style="background:#fef2f2; border:1px solid #ef4444; padding:15px; border-radius:10px; margin:20px 0;">
  <strong style="color:#dc2626;">Status: Rejected ❌</strong>
</div>

${
  reason
    ? `
    <div style="background:#fff7ed; border:1px solid #fb923c; padding:15px; border-radius:10px;">
      <strong>Reason:</strong><br/>
      ${reason}
    </div>
  `
    : `<p>Please upload valid documents and try again.</p>`
}

<!-- Button -->
<div style="text-align:center; margin:30px 0;">
  <a href="http://localhost:3000/kyc"
    style="
      background:#890eee;
      color:#fff;
      padding:14px 28px;
      border-radius:8px;
      text-decoration:none;
      font-weight:600;
      box-shadow:0 6px 18px rgba(137,14,238,0.3);
      display:inline-block;
    ">
    Re-submit KYC →
  </a>
</div>

<p style="font-size:13px; color:#777;">
Need help? Our support team is here for you.
</p>

</td>
</tr>

<!-- Social -->
<tr>
<td align="center" style="padding:20px;">
  <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="22"/></a>
  <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="22"/></a>
  <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="22"/></a>
</td>
</tr>

<!-- Footer -->
<tr>
<td align="center" style="padding:20px; font-size:12px; color:#888;">
  © ${new Date().getFullYear()} Your Company <br/>
  <a href="#" style="color:#890eee; text-decoration:none;">Support</a> • 
  <a href="#" style="color:#890eee; text-decoration:none;">Privacy</a>
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
