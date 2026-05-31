// app/admin/coupons/edit/[id]/page.js

"use client";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Paper,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { fetchCouponById, updateCoupon } from "@/slice/couponSlice";

import FormInput from "@/components/form/FormInput";
import FormNumber from "@/components/form/FormNumber";
import FormButton from "@/components/form/FormButton";
import { useRouter, useSearchParams } from "next/navigation";
export default function EditCouponPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const { current } = useSelector((state) => state.coupons);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    dispatch(fetchCouponById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (current) {
      setFormData({
        ...current,
        expires_at: current.expires_at?.slice(0, 16),
      });
    }
  }, [current]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      updateCoupon({
        id,
        couponData: formData,
      }),
    );

    router.push("/dashboard/admin/coupons/list")
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={3}>
          Edit Coupon
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

            <FormInput
              type="datetime-local"
              label="Expiry Date"
              value={formData.expires_at}
              onChange={(e) => handleChange("expires_at", e.target.value)}
            />

            <FormNumber
              label="Minimum Order Amount"
              value={formData.minimum_order_amount}
              onChange={(e) =>
                handleChange("minimum_order_amount", e.target.value)
              }
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

            {/* Full Width */}
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

            {/* Full Width */}
            <Box gridColumn={{ xs: "span 1", sm: "span 2" }}>
              <FormButton type="submit">Update Coupon</FormButton>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
