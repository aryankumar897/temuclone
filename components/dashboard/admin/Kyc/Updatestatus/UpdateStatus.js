"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { Box, Typography } from "@mui/material";
import FormTextarea from "@/components/form/FormTextarea";
import FormSelect from "@/components/form/FormSelect";
import FormButton from "@/components/form/FormButton";
import FormInput from "@/components/form/FormInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { kycUpdateStyles as sx } from "./kycUpdateStyles";

const KycStatusUpdate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kycId = searchParams.get("id");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    status: "",
    rejected_reason: "",
    document_type: "",
    document_number: "",
    full_address: "",
    gender: "",
    document_scan_copy: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch data
  useEffect(() => {
    const fetchKyc = async () => {
      try {
        if (!kycId) return;

        const res = await axios.get(`${process.env.API}/admin/kyc/${kycId}`);
        const data = res.data;

        setFormData({
          full_name: data.full_name || "",
          status: data.status || "pending",
          rejected_reason: data.rejected_reason || "",
          document_type: data.document_type || "",
          document_number: data.document_number || "",
          full_address: data.full_address || "",
          gender: data.gender || "",
          document_scan_copy: data.document_scan_copy || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchKyc();
  }, [kycId]);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Update
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // ✅ validation
      if (formData.status === "rejected" && !formData.rejected_reason) {
        alert("Please provide rejection reason");
        return;
      }

      const res = await fetch(`${process.env.API}/admin/kyc/update/${kycId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: formData.status,
          rejected_reason: formData.rejected_reason,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // ✅ success
      toast.success("Updated ✅");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error ❌");
    } finally {
      setLoading(false);
    }
  };
  if (!kycId) return <p>Invalid ID</p>;

  return (
    <Box sx={sx.wrapper}>

   <Box sx={{ mb: 2 }}>
      <FormButton
        onClick={() => router.back()}
        sx={{
          maxWidth: 150,
          bgcolor: "#e5e7eb",
          color: "#111",
          "&:hover": { bgcolor: "#d1d5db" },
        }}
      >
        ← Go Back
      </FormButton>
    </Box>

      <Typography sx={sx.sectionTitle}>KYC Details & Verification</Typography>

      <Box sx={sx.grid}>
        {/* ✅ Personal Info */}
        <FormInput label="Full Name" value={formData.full_name} disabled />
        <FormInput label="Gender" value={formData.gender} disabled />

        <FormInput
          label="Document Type"
          value={formData.document_type}
          disabled
        />
        <FormInput
          label="Document Number"
          value={formData.document_number}
          disabled
        />

        <FormInput
          label="Address"
          value={formData.full_address}
          disabled
          sx={sx.fullWidth}
        />

        {/* ✅ Image */}
        {formData.document_scan_copy && (
          <Box sx={sx.fullWidth}>
            <Typography sx={sx.sectionTitle}>Document Preview</Typography>
            <img src={formData.document_scan_copy} alt="doc" style={sx.image} />
          </Box>
        )}
        {formData.document_scan_copy && (
          <Box sx={sx.fullWidth}>
            <Typography sx={sx.sectionTitle}>Document</Typography>

            <a
              href={formData.document_scan_copy}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2563eb",
                fontWeight: 600,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Download Now
            </a>
          </Box>
        )}
        {/* ✅ Status Update */}
        <FormSelect
          label="KYC Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
          ]}
          sx={sx.fullWidth}
        />

        {formData.status === "rejected" && (
          <FormTextarea
            label="Rejection Reason"
            name="rejected_reason"
            value={formData.rejected_reason}
            onChange={handleChange}
            rows={4}
            sx={sx.fullWidth} // optional (see fix below)
          />
        )}
      </Box>

      <Box sx={sx.buttonWrap}>
        <FormButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update Status"}
        </FormButton>
      </Box>
    </Box>
  );
};

export default KycStatusUpdate;
