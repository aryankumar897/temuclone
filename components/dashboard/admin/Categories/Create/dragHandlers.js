import { toast } from "react-hot-toast";
import { getLevel } from "./treeUtils";

export const handleDragEndLogic = async ({
  event,
  categories,
  position,
  onRefresh,
}) => {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const activeItem = categories.find((d) => d._id === active.id);
  const overItem = categories.find((d) => d._id === over.id);

  if (!activeItem || !overItem) return;

  const overLevel = getLevel(categories, over.id);

  let newParentId = null;

  if (position === "inside") {
    if (overLevel === 0) newParentId = over.id;
    else newParentId = null;
  } else {
    newParentId = overItem.parent_id || null;
  }

  if (newParentId) {
    const newParent = categories.find(c => c._id === newParentId);
    if (newParent && newParent.parent_id !== null) {
      toast.error("Cannot move subcategory under another subcategory. Only 2 levels allowed!");
      return;
    }
  }

  let updated = categories.filter((item) => item._id !== active.id);

  let siblings = updated.filter(
    (item) => item.parent_id === newParentId
  );

  let insertIndex = siblings.length;

  if (position !== "inside") {
    const overIndex = siblings.findIndex((i) => i._id === over.id);
    insertIndex = position === "before" ? overIndex : overIndex + 1;
  }

  siblings.splice(insertIndex, 0, {
    ...activeItem,
    parent_id: newParentId,
  });

  siblings = siblings.map((item, index) => ({
    ...item,
    position: index,
  }));

  const updates = siblings.map((item, index) => ({
    _id: item._id,
    parent_id: item.parent_id,
    position: index,
  }));

  try {
    const response = await fetch(`${process.env.API}/admin/categories/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Categories reordered successfully!");
      if (onRefresh) onRefresh();
    } else {
      toast.error("Failed to reorder categories!");
    }
  } catch (error) {
    toast.error("Failed to reorder categories!");
    console.log(error);
  }
};