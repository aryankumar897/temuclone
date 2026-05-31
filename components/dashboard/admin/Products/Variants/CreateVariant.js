"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { createVariants } from "@/slice/variantSlice";

import AttributeSelector from "@/components/dashboard/admin/Products/Create/AttributeSelector";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormFileUpload from "@/components/form/FormFileUpload";

// 🔥 generate combinations
const generateCombinations = (selectedAttributes) => {
  const entries = Object.entries(selectedAttributes);
  if (!entries.length) return [];

  return entries.reduce(
    (acc, [attrId, values]) =>
      acc.flatMap((a) =>
        values.map((v) => [
          ...a,
          { attribute: attrId, value: v },
        ])
      ),
    [[]]
  );
};

const VariantPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [attributeData, setAttributeData] = useState({
    attributeIds: [],
    selectedAttributes: {},
    customAttributes: {},
  });

  const [variants, setVariants] = useState([]);

  // ✅ generate variants
  const handleAttributeChange = (data) => {
    setAttributeData(data);

    const combos = generateCombinations(data.selectedAttributes);

    const usedSkus = new Set();

    const generated = combos.map((combo) => {
      // 🔥 base SKU from attributes
      let baseSku = combo
        .map((c) => String(c.value).toUpperCase())
        .join("-");

      let finalSku = baseSku;
      let count = 1;

      // 🔥 ensure uniqueness in current list
      while (usedSkus.has(finalSku)) {
        finalSku = `${baseSku}-${count}`;
        count++;
      }

      usedSkus.add(finalSku);

      return {
        attributes: combo,
        sku: finalSku,
        price: 0,
        special_price: 0,
        stock: 0,
        media: [],
        status: "active",
      };
    });

    setVariants(generated);
  };

  // ✅ handle change
  const handleChange = (index, name, value) => {
    const updated = [...variants];
    updated[index][name] = value;
    setVariants(updated);
  };

  // ✅ media
  const handleMedia = (index, ids) => {
    const updated = [...variants];
    updated[index].media = ids;
    setVariants(updated);
  };

  // ✅ submit
  const handleSubmit = () => {
    dispatch(
      createVariants({
        productId,
        variants,
      })
    );
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Create Variants</Typography>

      {/* Attribute Selector */}
      <AttributeSelector onChange={handleAttributeChange} />

      {/* Variants */}
      {variants.map((v, i) => (
        <Box key={i} sx={{ borderBottom: "1px solid #eee", py: 2 }}>
          
          <Typography>
            {v.attributes.map((a) => a.value).join(" / ")}
          </Typography>

          <FormInput
            label="SKU"
            value={v.sku}
            onChange={(e) =>
              handleChange(i, "sku", e.target.value)
            }
            sx={{ mt: 1 }}
          />

          <FormInput
            label="Price"
            value={v.price}
            onChange={(e) =>
              handleChange(i, "price", Number(e.target.value))
            }
            sx={{ mt: 1 }}
          />

          <FormInput
            label="Special Price"
            value={v.special_price}
            onChange={(e) =>
              handleChange(i, "special_price", Number(e.target.value))
            }
            sx={{ mt: 1 }}
          />

          <FormInput
            label="Stock"
            value={v.stock}
            onChange={(e) =>
              handleChange(i, "stock", Number(e.target.value))
            }
            sx={{ mt: 1 }}
          />

          <FormSelect
            label="Status"
            value={v.status}
            onChange={(e) =>
              handleChange(i, "status", e.target.value)
            }
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            sx={{ mt: 1 }}
          />

          <FormFileUpload
            onChange={(ids) => handleMedia(i, ids)}
          />
        </Box>
      ))}

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Save Variants
      </Button>
    </Paper>
  );
};

export default VariantPage;