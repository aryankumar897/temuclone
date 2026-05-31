// "use client";

// import { Box, Typography, Divider, Switch, FormControlLabel } from "@mui/material";
// import { useState } from "react";
// import FormInput from "@/components/form/FormInput";
// import FormSelect from "@/components/form/FormSelect";
// import FormButton from "@/components/form/FormButton";
// import styles from "./styles";

// export default function CategoryForm() {
//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     parent_id: "",
//     is_active: true,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <Box>
//       <Typography sx={styles.title}>Create Category</Typography>

//       <Divider sx={styles.divider} />

//       {/* Name */}
//       <FormInput
//         label="Name *"
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />

//       {/* Slug */}
//       <FormInput
//         label="Slug *"
//         name="slug"
//         value={form.slug}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />

//       {/* Parent Category */}
//       <FormSelect
//         label="Parent Category"
//         name="parent_id"
//         value={form.parent_id}
//         onChange={handleChange}
//         options={[
//           { label: "None (Root)", value: "" },
//           { label: "Computer", value: "1" },
//           { label: "Mobile", value: "2" },
//         ]}
//         sx={{ mb: 2 }}
//       />

//       {/* Active Switch */}
//       <FormControlLabel
//         control={
//           <Switch
//             checked={form.is_active}
//             onChange={(e) =>
//               setForm((prev) => ({
//                 ...prev,
//                 is_active: e.target.checked,
//               }))
//             }
//           />
//         }
//         label="Active"
//       />

//       {/* Buttons */}
//       <Box sx={styles.actions}>
//         <FormButton>Save</FormButton>
//       </Box>
//     </Box>
//   );
// }

// "use client";

// import { Box, Typography, Divider, Switch, FormControlLabel } from "@mui/material";
// import { useState, useEffect } from "react";
// import { Toaster, toast } from "react-hot-toast";
// import FormInput from "@/components/form/FormInput";
// import FormSelect from "@/components/form/FormSelect";
// import FormButton from "@/components/form/FormButton";
// import styles from "./styles";

// export default function CategoryForm({ selectedCategory, onSave, categories = [] }) {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     parent_id: "",
//     is_active: true,
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (selectedCategory && selectedCategory._id) {
//       setFormData({
//         name: selectedCategory.name || "",
//         slug: selectedCategory.slug || "",
//         parent_id: selectedCategory.parent_id || "",
//         is_active: selectedCategory.is_active !== undefined ? selectedCategory.is_active : true,
//       });
//     } else {
//       setFormData({
//         name: "",
//         slug: "",
//         parent_id: "",
//         is_active: true,
//       });
//     }
//     setErrors({});
//   }, [selectedCategory]);

//   const generateSlug = (name) => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-|-$/g, "");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "name") {
//       const slug = generateSlug(value);
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//         slug: selectedCategory && selectedCategory.name === prev.name ? prev.slug : slug
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSwitchChange = (e) => {
//     setFormData(prev => ({ ...prev, is_active: e.target.checked }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.slug.trim()) {
//       newErrors.slug = "Slug is required";
//     } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
//       newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     setLoading(true);

//     try {
//       const url = selectedCategory && selectedCategory._id
//         ? `${process.env.API}/admin/categories/${selectedCategory._id}`
//         : `${process.env.API}/admin/categories`;

//       const method = selectedCategory && selectedCategory._id ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (result.success) {
//         toast.success(selectedCategory && selectedCategory._id ? "Category updated successfully!" : "Category created successfully!");
//         setFormData({
//           name: "",
//           slug: "",
//           parent_id: "",
//           is_active: true,
//         });
//         if (onSave) onSave(result.data);
//       } else {
//         toast.error(result.error || "Something went wrong!");
//       }
//     } catch (error) {
//       toast.error("Failed to save category!");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: "",
//       slug: "",
//       parent_id: "",
//       is_active: true,
//     });
//     setErrors({});
//     if (onSave) onSave(null);
//   };

//   // Prepare parent category options
//   const getCategoryOptions = () => {
//     const buildOptions = (items, level = 0, parentId = null) => {
//       let options = [];
//       const filtered = items.filter(cat =>
//         cat.parent_id === parentId &&
//         (!selectedCategory || !selectedCategory._id || cat._id !== selectedCategory._id)
//       );

//       filtered.forEach(cat => {
//         options.push({
//           label: "  ".repeat(level) + cat.name,
//           value: cat._id,
//         });
//         options.push(...buildOptions(items, level + 1, cat._id));
//       });

//       return options;
//     };

//     return [
//       { label: "None (Root Category)", value: "" },
//       ...buildOptions(categories),
//     ];
//   };

//   return (
//     <Box>
//       <Toaster position="top-right" />
//       <Typography sx={styles.title}>
//         {selectedCategory && selectedCategory._id ? "Edit Category" : "Create Category"}
//       </Typography>

//       <Divider sx={styles.divider} />

//       <form onSubmit={onSubmit}>
//         {/* Name */}
//         <FormInput
//           label="Name *"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           error={errors.name}
//           sx={{ mb: 2 }}
//         />

//         {/* Slug */}
//         <FormInput
//           label="Slug *"
//           name="slug"
//           value={formData.slug}
//           onChange={handleChange}
//           error={errors.slug}
//           sx={{ mb: 2 }}
//         />

//         {/* Parent Category */}
//         <FormSelect
//           label="Parent Category"
//           name="parent_id"
//           value={formData.parent_id}
//           onChange={handleChange}
//           options={getCategoryOptions()}
//           sx={{ mb: 2 }}
//         />

//         {/* Active Switch */}
//         <FormControlLabel
//           control={
//             <Switch
//               checked={formData.is_active}
//               onChange={handleSwitchChange}
//             />
//           }
//           label="Active"
//           sx={{ mb: 2, display: "block" }}
//         />

//         {/* Buttons */}
//         <Box sx={styles.actions}>
//           <FormButton type="submit" loading={loading}>
//             {selectedCategory && selectedCategory._id ? "Update" : "Save"}
//           </FormButton>
//           {(selectedCategory && selectedCategory._id) && (
//             <FormButton
//               type="button"
//               variant="outlined"
//               onClick={handleCancel}
//               sx={{ ml: 1 }}
//             >
//               Cancel
//             </FormButton>
//           )}
//         </Box>
//       </form>
//     </Box>
//   );
// }




"use client";

import {
  Box,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormButton from "@/components/form/FormButton";
import styles from "./styles";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useDispatch, useSelector } from "react-redux";

import { fetchAttributes } from "@/slice/attributeSlice";

export default function CategoryForm({
  selectedCategory,
  onSave,
  categories = [],
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent_id: "",
    is_active: true,
    image: "", // 🔥 NEW FIELD

    // 🔥 NEW
    filterAttributes: [],
  });
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { list: attributes = [] } = useSelector((state) => state.attributes);

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);
  useEffect(() => {
    if (selectedCategory && selectedCategory._id) {
      setFormData({
        name: selectedCategory.name || "",
        slug: selectedCategory.slug || "",
        parent_id: selectedCategory.parent_id || "",
        is_active:
          selectedCategory.is_active !== undefined
            ? selectedCategory.is_active
            : true,

        image: selectedCategory?.image || "", // 🔥 NEW
        // 🔥 IMPORTANT
        filterAttributes:
          selectedCategory.filterAttributes?.map((a) =>
            typeof a === "object" ? a._id : a,
          ) || [],
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        parent_id: "",
        is_active: true,
        image: "",
        filterAttributes: [],
      });
      setPreview("");
    }
    setErrors({});
  }, [selectedCategory]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // ✅ Upload image to Cloudinary
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      const formDataImg = new FormData();
      formDataImg.append("file", file);
      formDataImg.append("upload_preset", "ml_default");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formDataImg,
        },
      );

      const data = await res.json();

      setFormData((prev) => ({
        ...prev,
        image: data.secure_url, // ✅ SAVE URL
      }));

      toast.success("Image uploaded ✅");
    } catch {
      toast.error("Upload failed ❌");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const slug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: slug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSwitchChange = (e) => {
    setFormData((prev) => ({ ...prev, is_active: e.target.checked }));
  };

  // Get the depth/level of a category
  const getCategoryDepth = (categoryId, depth = 0) => {
    if (!categoryId) return depth;

    const category = categories.find((cat) => cat._id === categoryId);
    if (!category) return depth;

    if (!category.parent_id) {
      return depth;
    }

    return getCategoryDepth(category.parent_id, depth + 1);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    // Check nesting limit
    if (formData.parent_id) {
      const parentDepth = getCategoryDepth(formData.parent_id);
      console.log(
        "Parent Depth:",
        parentDepth,
        "For Parent ID:",
        formData.parent_id,
      );

      // Allow:
      // - Depth 0 (Root Category) -> Can create Subcategory (Level 1)
      // - Depth 1 (Subcategory) -> Can create Child (Level 2)
      // - Depth 2 (Child) -> Cannot create more (Blocked)
      if (parentDepth >= 2) {
        newErrors.parent_id =
          "Cannot create category under a child category. Maximum nesting is 3 levels (Category → Subcategory → Child).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const url =
        selectedCategory && selectedCategory._id
          ? `${process.env.API}/admin/categories/${selectedCategory._id}`
          : `${process.env.API}/admin/categories`;

      const method = selectedCategory && selectedCategory._id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          selectedCategory && selectedCategory._id
            ? "Category updated successfully!"
            : "Category created successfully!",
        );
        setFormData({
          name: "",
          slug: "",
          parent_id: "",
          is_active: true,
        });
        if (onSave) onSave(result.data);
      } else {
        toast.error(result.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to save category!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      slug: "",
      parent_id: "",
      is_active: true,
    });
    setErrors({});
    if (onSave) onSave(null);
  };

  // Build tree structure with proper indentation and symbols
  const buildTreeWithSymbols = (
    items,
    parentId = null,
    prefix = "",
    isLast = true,
    level = 0,
  ) => {
    let options = [];

    // Filter children of current parent
    const children = items.filter(
      (item) =>
        item.parent_id === parentId &&
        (!selectedCategory ||
          !selectedCategory._id ||
          item._id !== selectedCategory._id),
    );

    // Sort children by position
    children.sort((a, b) => a.position - b.position);

    children.forEach((child, index) => {
      const isLastChild = index === children.length - 1;

      let label = "";
      let disabled = false;

      if (level === 0) {
        // Root level categories (Depth 0) - selectable
        label = child.name;
        disabled = false;
        options.push({
          label: label,
          value: child._id,
          disabled: disabled,
        });

        // Add subcategories (Depth 1)
        const subPrefix = "     ";
        const subChildren = items.filter(
          (item) => item.parent_id === child._id,
        );

        subChildren.sort((a, b) => a.position - b.position);

        subChildren.forEach((subChild, subIndex) => {
          const isLastSubChild = subIndex === subChildren.length - 1;
          const connector = subPrefix + (isLastSubChild ? "└── " : "├── ");
          const grandChildPrefix =
            subPrefix + (isLastSubChild ? "     " : "│    ");

          // Subcategories (Depth 1) - selectable
          options.push({
            label: connector + subChild.name,
            value: subChild._id,
            disabled: false,
          });

          // Add child categories (Depth 2)
          const grandChildren = items.filter(
            (item) => item.parent_id === subChild._id,
          );
          grandChildren.sort((a, b) => a.position - b.position);

          grandChildren.forEach((grandChild, grandIndex) => {
            const isLastGrandChild = grandIndex === grandChildren.length - 1;
            const grandConnector =
              grandChildPrefix + (isLastGrandChild ? "└── " : "├── ");

            // Child categories (Depth 2) - selectable
            options.push({
              label: grandConnector + grandChild.name,
              value: grandChild._id,
              disabled: false,
            });
          });
        });
      } else {
        // For other levels, add with proper indentation
        const connector = prefix + (isLastChild ? "└── " : "├── ");
        const childPrefix = prefix + (isLastChild ? "     " : "│    ");

        label = connector + child.name;
        disabled = false;

        options.push({
          label: label,
          value: child._id,
          disabled: disabled,
        });

        // Only go one more level deep (max depth 2)
        if (level < 2) {
          const childOptions = buildTreeWithSymbols(
            items,
            child._id,
            childPrefix,
            isLastChild,
            level + 1,
          );
          options.push(...childOptions);
        }
      }
    });

    return options;
  };

  // Prepare parent category options with tree structure
  const getCategoryOptions = () => {
    // Build tree structure
    const treeOptions = buildTreeWithSymbols(categories);

    // Add "None (Root Category)" at the beginning
    return [
      { label: "None (Root Category)", value: "", disabled: false },
      ...treeOptions,
    ];
  };

  return (
    <Box>
      <Toaster position="top-right" />
      <Typography sx={styles.title}>
        {selectedCategory && selectedCategory._id
          ? "Edit Category"
          : "Create Category"}
      </Typography>

      <Divider sx={styles.divider} />

      <form onSubmit={onSubmit}>
        <FormInput
          label="Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          sx={{ mb: 2 }}
        />

        <FormInput
          label="Slug *"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          error={errors.slug}
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1 }}>Category Image</Typography>

          {/* Hidden Input */}
          <input
            id="category-image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          {/* Button */}
          <label htmlFor="category-image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Upload Image
            </Button>
          </label>

          {/* ✅ FIXED PREVIEW */}
          {(preview || selectedCategory?.image) && (
            <Box mt={2}>
              <img
                src={preview || selectedCategory?.image}
                alt="preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                }}
              />
            </Box>
          )}
        </Box>

        <FormSelect
          label="Parent Category"
          name="parent_id"
          value={formData.parent_id}
          onChange={handleChange}
          options={getCategoryOptions()}
          sx={{ mb: 2 }}
          helperText="✓ Categories can have subcategories | ✓ Subcategories can have children | ✗ Children cannot have more categories"
        />

        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>
            Filter Attributes
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {attributes.map((attr) => {
              const selected = formData.filterAttributes?.includes(attr._id);

              return (
                <Box
                  key={attr._id}
                  onClick={() => {
                    if (selected) {
                      setFormData((prev) => ({
                        ...prev,
                        filterAttributes: prev.filterAttributes.filter(
                          (id) => id !== attr._id,
                        ),
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        filterAttributes: [...prev.filterAttributes, attr._id],
                      }));
                    }
                  }}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: selected ? "primary.main" : "#ddd",
                    bgcolor: selected ? "primary.main" : "#fff",
                    color: selected ? "#fff" : "#333",
                    userSelect: "none",
                  }}
                >
                  {attr.name}
                </Box>
              );
            })}
          </Box>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={formData.is_active}
              onChange={handleSwitchChange}
            />
          }
          label="Active"
          sx={{ mb: 2, display: "block" }}
        />

        <Box sx={styles.actions}>
          <FormButton type="submit" loading={loading}>
            {selectedCategory && selectedCategory._id ? "Update" : "Save"}
          </FormButton>
          {selectedCategory && selectedCategory._id && (
            <FormButton
              type="button"
              variant="outlined"
              onClick={handleCancel}
              sx={{ ml: 1 }}
            >
              Cancel
            </FormButton>
          )}
        </Box>
      </form>
    </Box>
  );
}
