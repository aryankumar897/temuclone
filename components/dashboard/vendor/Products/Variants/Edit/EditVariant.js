"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { updateVariant } from "@/slice/vendorvariantSlice";

import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormFileUpload from "@/components/form/FormFileUpload";

const VariantEditPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const variantId = searchParams.get("id");

  const [variant, setVariant] = useState(null);

  // ✅ fetch single variant (with populated data)
  useEffect(() => {
    if (!variantId) return;

    const fetchVariant = async () => {
      const res = await fetch(
        `${process.env.API}/vendors/variants/${variantId}`
      );
      const data = await res.json();

      setVariant(data);
    };

    fetchVariant();
  }, [variantId]);

  // ✅ handle change (same pattern as create)
  const handleChange = (name, value) => {
    setVariant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ media
  const handleMedia = (ids) => {
    setVariant((prev) => ({
      ...prev,
      media: ids,
    }));
  };

  // ✅ submit
  const handleSubmit = async () => {
    await dispatch(
      updateVariant({
        id: variantId,
        variantData: variant,
      })
    );

    router.back();
  };

  if (!variant) return <p>Loading...</p>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Edit Variant</Typography>

      {/* PRODUCT NAME */}
      <Typography sx={{ mb: 2 }} color="gray">
        {variant.product?.name}
      </Typography>

      {/* ATTRIBUTES (same style as create page) */}
      <Box sx={{ borderBottom: "1px solid #eee", py: 2 }}>
        <Typography>
          {variant.attributes
            ?.map((a) => a.value)
            .join(" / ")}
        </Typography>

        {/* SKU */}
        <FormInput
          label="SKU"
          value={variant.sku}
          onChange={(e) =>
            handleChange("sku", e.target.value)
          }
          sx={{ mt: 1 }}
        />

        {/* PRICE */}
        <FormInput
          label="Price"
          value={variant.price}
          onChange={(e) =>
            handleChange("price", Number(e.target.value))
          }
          sx={{ mt: 1 }}
        />

        {/* SPECIAL PRICE */}
        <FormInput
          label="Special Price"
          value={variant.special_price}
          onChange={(e) =>
            handleChange(
              "special_price",
              Number(e.target.value)
            )
          }
          sx={{ mt: 1 }}
        />

        {/* STOCK */}
        <FormInput
          label="Stock"
          value={variant.stock}
          onChange={(e) =>
            handleChange("stock", Number(e.target.value))
          }
          sx={{ mt: 1 }}
        />

        {/* STATUS */}
        <FormSelect
          label="Status"
          value={variant.status}
          onChange={(e) =>
            handleChange("status", e.target.value)
          }
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          sx={{ mt: 1 }}
        />

        {/* MEDIA PREVIEW */}
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          {variant.media?.map((m) =>
            m.type === "image" ? (
              <img
                key={m._id}
                src={m.url}
                width={40}
                height={40}
                style={{ borderRadius: 6 }}
              />
            ) : (
              <video
                key={m._id}
                src={m.url}
                width={40}
                height={40}
                style={{ borderRadius: 6 }}
              />
            )
          )}
        </Box>

        {/* MEDIA UPLOAD */}
        <FormFileUpload onChange={handleMedia} />
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Update Variant
      </Button>
    </Paper>
  );
};

export default VariantEditPage;