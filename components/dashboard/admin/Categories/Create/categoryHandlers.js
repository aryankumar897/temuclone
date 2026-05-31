import { toast } from "react-hot-toast";

export const handleDeleteCategory = async ({
  category,
  onRefresh,
  onSelectCategory,
}) => {
  if (!confirm(`Are you sure you want to delete "${category.name}" and all its subcategories?`)) {
    return;
  }

  try {
    const response = await fetch(`${process.env.API}/admin/categories/${category._id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Category deleted successfully!");
      if (onRefresh) onRefresh();
      if (onSelectCategory) onSelectCategory(null);
    } else {
      toast.error(result.error || "Failed to delete category!");
    }
  } catch (error) {
    toast.error("Failed to delete category!");
    console.error(error);
  }
};

export const handleAddSubcategory = (parentCategory, onSelectCategory) => {
  onSelectCategory({
    parent_id: parentCategory._id,
    name: "",
    slug: "",
    is_active: true,
  });
};