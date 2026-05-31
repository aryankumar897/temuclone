"use client";

import { useState, useEffect } from "react";
import { Typography, Paper, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { createProduct } from "@/slice/productSlice";

import RichTextEditor from "@/components/form/RichTextEditor";
import FormInput from "@/components/form/FormInput";
import FormFileUpload from "@/components/form/FormFileUpload";
import AttributeSelector from "./AttributeSelector";
import FormSelect from "@/components/form/FormSelect";
import { editorStyles } from "./productFormStyles";
import { runAi } from "@/ai/Ai";
import { marked } from "marked";
import { useRouter } from "next/navigation";
// ================= HELPERS =================
const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const generateSKU = (name = "") =>
  name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);

// ================= COMPONENT =================
const ProductForm = ({
  formData,
  setFormData,
  onSubmit, // ✅ NEW
  isEdit = false, // ✅ NEW
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);
  const router = useRouter();
  // const [attributeData, setAttributeData] = useState({
  //   attributeIds: [],
  //   selectedAttributes: {},
  //   customAttributes: {},
  // });

  const [attributeData, setAttributeData] = useState({
    attributeIds: formData.attributes || [],
     selectedAttributes: formData.attributeValues || {},
    customAttributes: formData.customAttributes || {},
  });

  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.attributes) {
      setAttributeData({
        attributeIds: formData.attributes,
         selectedAttributes: formData.attributeValues || {},
        customAttributes: formData.customAttributes || {},
      });
    }
  }, [formData]);

  // ================= PREFILL FOR EDIT =================
  useEffect(() => {
    if (isEdit && formData) {
      setShortDesc(formData.short_description || "");
      setDescription(formData.description || "");
    }
  }, [isEdit, formData]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: slugify(value),
        sku: generateSKU(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (imageIds) => {
    setFormData((prev) => ({
      ...prev,
      images: imageIds,
    }));
  };

  // ================= AI =================
  const generateAI = async (type) => {
    const prompt =
      type === "short"
        ? `Write a short product description for ${formData.name}`
        : `Write a detailed product description for ${formData.name}`;

    const res = await runAi(prompt);
    const formatted = marked.parse(res);

    if (type === "short") setShortDesc(formatted);
    else setDescription(formatted);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        slug:
          formData.slug || formData.name?.toLowerCase().replace(/\s+/g, "-"),

        price: formData.price,
        special_price: formData.special_price,

        sku: formData.sku,
        qty: formData.qty,
        manage_stock: true,
        in_stock: formData.qty > 0,
        status: formData.status,

        short_description: shortDesc,
        description,

        media: formData.images,

        store_id: formData.store_id,
        brand_id: formData.brand_id,
        category: formData.category,
        tag_id: formData.tag_id,

        attributes: attributeData.attributeIds,
        // 🔥 SELECT / COLOR (NEW IMPORTANT)
        attributeValues: attributeData.selectedAttributes,
        customAttributes: attributeData.customAttributes,
      };

      // 👉 If edit → use parent handler
      if (onSubmit) {
        onSubmit(payload);
        return;
      }

      await dispatch(createProduct(payload)).unwrap();

      console.log("✅ Product created");

      // OPTIONAL: Reset form after submit
      // setFormData({});
      // setShortDesc("");
      // setDescription("");

      router.push(`/dashboard/admin/products/list`);
    } catch (err) {
      console.log("❌ Error:", err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Product Information
      </Typography>

      {/* NAME */}
      <FormInput
        label="Product Name"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
      />

      {/* PRICE */}
      <FormInput
        label="Price"
        name="price"
        value={formData.price || ""}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      <FormInput
        label="Special Price"
        name="special_price"
        value={formData.special_price || ""}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      {/* SKU */}
      <FormInput
        label="SKU"
        name="sku"
        value={formData.sku || ""}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      {/* QTY */}
      <FormInput
        label="Quantity"
        name="qty"
        value={formData.qty || ""}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      {/* SLUG */}
      <FormInput
        label="Slug"
        name="slug"
        value={formData.slug || ""}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      {/* SHORT DESCRIPTION */}
      <Typography mt={2}>Short Description</Typography>
      <RichTextEditor
        value={shortDesc}
        onChange={setShortDesc}
        showAI
        onGenerateAI={() => generateAI("short")}
        borderColor="#ec7a4d"
        minHeight={200}
        styles={editorStyles}
      />

      {/* FULL DESCRIPTION */}
      <Typography mt={2}>Description</Typography>
      <RichTextEditor
        value={description}
        onChange={setDescription}
        showAI
        onGenerateAI={() => generateAI("full")}
        borderColor="#ec7a4d"
        minHeight={200}
        styles={editorStyles}
      />

      {/* IMAGES */}
      <FormFileUpload onChange={handleFileChange} value={formData.images} />

      {/* ATTRIBUTES */}
      <AttributeSelector onChange={setAttributeData} value={attributeData} />

      {/* STATUS */}
      <FormSelect
        label="Status"
        name="status"
        value={formData.status || "draft"}
        onChange={handleChange}
        options={[
          { label: "Draft", value: "draft" },
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
        sx={{ mt: 2 }}
      />

      {/* SUBMIT */}
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {/* {loading ? "Creating..." : "Create Product"} */}

        {loading
          ? isEdit
            ? "Updating..."
            : "Creating..."
          : isEdit
            ? "Update Product"
            : "Create Product"}
      </Button>
    </Paper>
  );
};

export default ProductForm;
