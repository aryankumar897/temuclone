"use client";

import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const KycPendingAlert = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [kycVerificationStatus, setKycVerificationStatus] = useState(null);
  const [userKycStatus, setUserKycStatus] = useState(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!session?.user?._id) return;

    const fetchKycStatus = async () => {
      try {
        const res = await fetch(`${process.env.API}/vendors/kyc/my-status`);
        const data = await res.json();

        if (data.success) {
          setUserKycStatus(data.kyc_status); // string
          setKycVerificationStatus(data.kyc_verification?.status ?? null);
        }
      } catch (err) {
        console.error("KYC fetch failed", err);
      }
    };

    fetchKycStatus();
  }, [session]);

  // ✅ Redirect when approved
  useEffect(() => {
    if (
      userKycStatus === "approved" &&
      kycVerificationStatus === "approved"
    ) {
      router.replace("/dashboard/vendor");
    }
  }, [userKycStatus, kycVerificationStatus, router]);

  if (status === "loading") return null;
  if (!open) return null;

  // ✅ Correct logic
  const isPending =
    userKycStatus === "pending" ||
    kycVerificationStatus === "pending";

  const isRejected =
    userKycStatus === "rejected" ||
    kycVerificationStatus === "rejected";

  const isNotSubmitted =
    userKycStatus === "not_submitted" && !kycVerificationStatus;

  // ❌ Rejected UI
  if (isRejected) {
    return (
      <Alert
        severity="error"
        sx={{ mb: 2, borderRadius: 2 }}
        action={
          <IconButton onClick={() => setOpen(false)} size="small">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>KYC Rejected</AlertTitle>
        Your KYC verification was rejected. Please re-submit your documents.
      </Alert>
    );
  }

  // ⚠️ Pending UI
  if (isPending) {
    return (
      <Alert
        severity="warning"
        sx={{ mb: 2, borderRadius: 2 }}
        action={
          <IconButton onClick={() => setOpen(false)} size="small">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>KYC Pending</AlertTitle>
        Your KYC request is under review.
      </Alert>
    );
  }

  // 🆕 Not submitted UI (optional but recommended)
  if (isNotSubmitted) {
    return (
      <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
        <AlertTitle>KYC Required</AlertTitle>
        Please complete your KYC to access vendor features.
      </Alert>
    );
  }

  return null;
};

export default KycPendingAlert;