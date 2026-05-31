// app/admin/coupons/create/page.js

"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Paper,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import FormInput from "@/components/form/FormInput";
import FormNumber from "@/components/form/FormNumber";
import FormButton from "@/components/form/FormButton";
import { useRouter } from 'next/navigation'

import { createCoupon } from "@/slice/couponSlice";

export default function CreateCouponPage() {
  const dispatch = useDispatch();
 const router = useRouter()
  const [formData, setFormData] = useState({
    code: "",
    discount_type: "percentage",
    discount_value: 0,
    max_discount: 0,
    minimum_order_amount: 0,
    expires_at: "",
    usage_limit: 1,
    per_user_limit: 1,
    is_active: true,
    description: "",

   
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createCoupon(formData));

router.push('/dashboard/admin/list')

  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={3}>
          Create Coupon
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
            }}
            gap={2}
          >
            <FormInput
              label="Coupon Code"
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value)}
            />

            <FormInput
              select
              label="Discount Type"
              value={formData.discount_type}
              onChange={(e) => handleChange("discount_type", e.target.value)}
            >
              <MenuItem value="percentage">Percentage</MenuItem>

              <MenuItem value="fixed">Fixed</MenuItem>
            </FormInput>

            <FormNumber
              label="Discount Value"
              value={formData.discount_value}
              onChange={(e) => handleChange("discount_value", e.target.value)}
            />

            <FormNumber
              label="Max Discount"
              value={formData.max_discount}
              onChange={(e) => handleChange("max_discount", e.target.value)}
            />

            <FormNumber
              label="Minimum Order Amount"
              value={formData.minimum_order_amount}
              onChange={(e) =>
                handleChange("minimum_order_amount", e.target.value)
              }
            />

            <FormInput
              type="datetime-local"
              label="Expiry Date"
              value={formData.expires_at}
              onChange={(e) => handleChange("expires_at", e.target.value)}
            />

            <FormNumber
              label="Usage Limit"
              value={formData.usage_limit}
              onChange={(e) => handleChange("usage_limit", e.target.value)}
            />

            <FormNumber
              label="Per User Limit"
              value={formData.per_user_limit}
              onChange={(e) => handleChange("per_user_limit", e.target.value)}
            />

            {/* Full width */}
            <Box gridColumn={{ xs: "span 1", sm: "span 2" }}>
              <FormInput
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Box>

            {/* Full width */}
            <Box gridColumn={{ xs: "span 1", sm: "span 2" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_active}
                    onChange={(e) =>
                      handleChange("is_active", e.target.checked)
                    }
                  />
                }
                label="Active Coupon"
              />
            </Box>

            {/* Full width */}
            <Box gridColumn={{ xs: "span 1", sm: "span 2" }}>
              <FormButton type="submit">Create Coupon</FormButton>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
