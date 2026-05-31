// "use client";

// import { Box, Typography } from "@mui/material";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
// import styles from "./categoryTreestyles";

// const data = [
//   {
//     name: "Computer",
//     children: [
//       { name: "child category" },
//       { name: "sub category" },
//       { name: "test-category" },
//     ],
//   },
//   { name: "mobile" },
//   { name: "test1234" },
//   { name: "mobile12" },
// ];

// const Row = ({ item, isChild }) => {
//   return (
//     <Box sx={{ ...styles.row, ...(isChild && styles.child) }}>
//       <Box sx={styles.left}>
//         {/* Drag Icon */}
//         <Box sx={styles.dragIcon}>
//           <DragIndicatorIcon fontSize="small" />
//         </Box>

//         {/* Folder Icon */}
//         <FolderOutlinedIcon sx={styles.folderIcon} />

//         {/* Name */}
//         <Typography sx={styles.name}>{item.name}</Typography>

//         {/* Active Dot */}
//         <Box sx={styles.dot} />
//       </Box>
//     </Box>
//   );
// };

// export default function CategoryTree() {
//   return (
//     <Box sx={styles.wrapper}>
//       {data.map((item, index) => (
//         <Box key={index}>
//           {/* Parent */}
//           <Row item={item} />

//           {/* Children */}
//           {item.children?.map((child, i) => (
//             <Row key={i} item={child} isChild />
//           ))}
//         </Box>
//       ))}
//     </Box>
//   );
// }













// "use client";

// import { useState } from "react";
// import { Box, Typography, IconButton } from "@mui/material";
// import { Toaster, toast } from "react-hot-toast";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
// import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import {
//   DndContext,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragOverlay,
// } from "@dnd-kit/core";

// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   useSortable,
// } from "@dnd-kit/sortable";

// import { CSS } from "@dnd-kit/utilities";

// import styles from "./categoryTreestyles";

// const buildTree = (data) => {
//   const map = {};
//   const roots = [];

//   data.forEach((item) => {
//     map[item._id] = { ...item, children: [] };
//   });

//   data.forEach((item) => {
//     if (item.parent_id && map[item.parent_id]) {
//       map[item.parent_id].children.push(map[item._id]);
//     } else {
//       roots.push(map[item._id]);
//     }
//   });

//   const sortTree = (nodes) =>
//     nodes
//       .sort((a, b) => a.position - b.position)
//       .map((n) => ({
//         ...n,
//         children: sortTree(n.children || []),
//       }));

//   return sortTree(roots);
// };

// const getLevel = (categories, id) => {
//   let level = 0;
//   let current = categories.find((d) => d._id === id);

//   while (current?.parent_id) {
//     level++;
//     current = categories.find((d) => d._id === current.parent_id);
//   }

//   return level;
// };

// const SortableRow = ({
//   item,
//   level = 0,
//   overId,
//   position,
//   openMap,
//   setOpenMap,
//   onEdit,
//   onDelete,
//   onAddSubcategory,
// }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: item._id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const hasChildren = item.children?.length > 0;
//   const isOpen = openMap[item._id] ?? true;
//   const isRoot = level === 0;
//   const canAddSubcategory = isRoot; // Only root categories can have subcategories

//   return (
//     <>
//       {overId === item._id && position === "before" && (
//         <Box sx={styles.dropLine} />
//       )}

//       <Box
//         ref={setNodeRef}
//         style={style}
//         sx={{
//           ...styles.row,
//           ...(level > 0 && styles.child),
//           ...(isDragging && styles.dragging),
//           pl: 2 + level * 3,
//           cursor: "grab",
//         }}
//       >
//         <Box sx={styles.left}>
//           {hasChildren ? (
//             <IconButton
//               size="small"
//               onClick={() =>
//                 setOpenMap((prev) => ({
//                   ...prev,
//                   [item._id]: !isOpen,
//                 }))
//               }
//             >
//               {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
//             </IconButton>
//           ) : (
//             <Box sx={{ width: 30 }} />
//           )}

//           <Box sx={styles.dragIcon} {...attributes} {...listeners}>
//             <DragIndicatorIcon fontSize="small" />
//           </Box>

//           {isOpen && hasChildren ? (
//             <FolderOpenOutlinedIcon sx={styles.folderIcon} />
//           ) : (
//             <FolderOutlinedIcon sx={styles.folderIcon} />
//           )}

//           <Typography sx={styles.name}>{item.name}</Typography>
//           {!isRoot && (
//             <Typography sx={styles.subcategoryBadge}>Subcategory</Typography>
//           )}

//           <Box sx={styles.actions}>
//             {canAddSubcategory && (
//               <IconButton
//                 size="small"
//                 onClick={() => onAddSubcategory(item)}
//                 sx={styles.actionIcon}
//                 title="Add Subcategory"
//               >
//                 <AddIcon fontSize="small" />
//               </IconButton>
//             )}
//             <IconButton
//               size="small"
//               onClick={() => onEdit(item)}
//               sx={styles.actionIcon}
//               title="Edit Category"
//             >
//               <EditIcon fontSize="small" />
//             </IconButton>
//             <IconButton
//               size="small"
//               onClick={() => onDelete(item)}
//               sx={styles.actionIcon}
//               title="Delete Category"
//             >
//               <DeleteIcon fontSize="small" />
//             </IconButton>
//           </Box>
//         </Box>
//       </Box>

//       {overId === item._id && position === "after" && (
//         <Box sx={styles.dropLine} />
//       )}

//       {isOpen && hasChildren && (
//         <SortableContext
//           items={item.children.map((c) => c._id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {item.children.map((child) => (
//             <SortableRow
//               key={child._id}
//               item={child}
//               level={level + 1}
//               overId={overId}
//               position={position}
//               openMap={openMap}
//               setOpenMap={setOpenMap}
//               onEdit={onEdit}
//               onDelete={onDelete}
//               onAddSubcategory={onAddSubcategory}
//             />
//           ))}
//         </SortableContext>
//       )}
//     </>
//   );
// };

// export default function CategoryTree({ categories, onSelectCategory, onRefresh }) {
//   const [activeId, setActiveId] = useState(null);
//   const [overId, setOverId] = useState(null);
//   const [position, setPosition] = useState("inside");
//   const [openMap, setOpenMap] = useState({});

//   const sensors = useSensors(useSensor(PointerSensor));
//   const tree = buildTree(categories);

//   const handleEdit = (category) => {
//     onSelectCategory(category);
//   };

//   const handleDelete = async (category) => {
//     if (!confirm(`Are you sure you want to delete "${category.name}" and all its subcategories?`)) {
//       return;
//     }
    
//     try {
//       const response = await fetch(`${process.env.API}/admin/categories/${category._id}`, {
//         method: "DELETE",
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         toast.success("Category deleted successfully!");
//         if (onRefresh) onRefresh();
//         if (onSelectCategory) onSelectCategory(null);
//       } else {
//         toast.error(result.error || "Failed to delete category!");
//       }
//     } catch (error) {
//       toast.error("Failed to delete category!");
//       console.error(error);
//     }
//   };

//   const handleAddSubcategory = (parentCategory) => {
//     onSelectCategory({
//       parent_id: parentCategory._id,
//       name: "",
//       slug: "",
//       is_active: true
//     });
//   };

//   const handleDragStart = (event) => {
//     setActiveId(event.active.id);
//   };

//   const handleDragOver = (event) => {
//     const { over, activatorEvent } = event;
//     if (!over) return;

//     setOverId(over.id);

//     const rect = over.rect;
//     const pointerY = activatorEvent.clientY;
//     const middle = rect.top + rect.height / 2;

//     if (pointerY < middle - 5) setPosition("before");
//     else if (pointerY > middle + 5) setPosition("after");
//     else setPosition("inside");
//   };

//   const handleDragEnd = async (event) => {
//     const { active, over } = event;

//     setActiveId(null);
//     setOverId(null);

//     if (!over || active.id === over.id) return;

//     const activeItem = categories.find((d) => d._id === active.id);
//     const overItem = categories.find((d) => d._id === over.id);

//     if (!activeItem || !overItem) return;

//     const overLevel = getLevel(categories, over.id);

//     let newParentId = null;

//     if (position === "inside") {
//       if (overLevel === 0) newParentId = over.id;
//       else newParentId = null;
//     } else {
//       newParentId = overItem.parent_id || null;
//     }

//     // Prevent moving subcategories under other subcategories
//     if (newParentId) {
//       const newParent = categories.find(c => c._id === newParentId);
//       if (newParent && newParent.parent_id !== null) {
//         toast.error("Cannot move subcategory under another subcategory. Only 2 levels allowed!");
//         return;
//       }
//     }

//     let updated = categories.filter((item) => item._id !== active.id);

//     let siblings = updated.filter(
//       (item) => item.parent_id === newParentId
//     );

//     let insertIndex = siblings.length;

//     if (position !== "inside") {
//       const overIndex = siblings.findIndex((i) => i._id === over.id);
//       insertIndex = position === "before" ? overIndex : overIndex + 1;
//     }

//     siblings.splice(insertIndex, 0, {
//       ...activeItem,
//       parent_id: newParentId,
//     });

//     siblings = siblings.map((item, index) => ({
//       ...item,
//       position: index,
//     }));

//     const updates = siblings.map((item, index) => ({
//       _id: item._id,
//       parent_id: item.parent_id,
//       position: index,
//     }));

//     try {
//       const response = await fetch(`${process.env.API}/admin/categories/reorder`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ updates }),
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         toast.success("Categories reordered successfully!");
//         if (onRefresh) onRefresh();
//       } else {
//         toast.error("Failed to reorder categories!");
//       }
//     } catch (error) {
//       toast.error("Failed to reorder categories!");
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-right" />
//       <DndContext
//         sensors={sensors}
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         onDragEnd={handleDragEnd}
//       >
//         <Box sx={styles.wrapper}>
//           <SortableContext
//             items={tree.map((i) => i._id)}
//             strategy={verticalListSortingStrategy}
//           >
//             {tree.map((item) => (
//               <SortableRow
//                 key={item._id}
//                 item={item}
//                 overId={overId}
//                 position={position}
//                 openMap={openMap}
//                 setOpenMap={setOpenMap}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//                 onAddSubcategory={handleAddSubcategory}
//               />
//             ))}
//           </SortableContext>
//         </Box>

//         <DragOverlay>
//           {activeId && (
//             <Box sx={styles.dragOverlay}>
//               {categories.find((d) => d._id === activeId)?.name}
//             </Box>
//           )}
//         </DragOverlay>
//       </DndContext>
//     </>
//   );
// }









"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import styles from "./categoryTreestyles";

import SortableRow from "./SortableRow";
import { buildTree } from "./treeUtils";
import { handleDeleteCategory, handleAddSubcategory } from "./categoryHandlers";
import { handleDragEndLogic } from "./dragHandlers";

export default function CategoryTree({ categories, onSelectCategory, onRefresh }) {
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [position, setPosition] = useState("inside");
  const [openMap, setOpenMap] = useState({});

  const sensors = useSensors(useSensor(PointerSensor));
  const tree = buildTree(categories);

  const handleEdit = (category) => {
    onSelectCategory(category);
  };

  return (
    <>
      <Toaster position="top-right" />

      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id)}
        onDragOver={(event) => {
          const { over, activatorEvent } = event;
          if (!over) return;

          setOverId(over.id);

          const rect = over.rect;
          const pointerY = activatorEvent.clientY;
          const middle = rect.top + rect.height / 2;

          if (pointerY < middle - 5) setPosition("before");
          else if (pointerY > middle + 5) setPosition("after");
          else setPosition("inside");
        }}
        onDragEnd={(event) => {
          setActiveId(null);
          setOverId(null);

          handleDragEndLogic({
            event,
            categories,
            position,
            onRefresh,
          });
        }}
      >
        <Box sx={styles.wrapper}>
          <SortableContext
            items={tree.map((i) => i._id)}
            strategy={verticalListSortingStrategy}
          >
            {tree.map((item) => (
              <SortableRow
                key={item._id}
                item={item}
                overId={overId}
                position={position}
                openMap={openMap}
                setOpenMap={setOpenMap}
                onEdit={handleEdit}
                onDelete={(cat) =>
                  handleDeleteCategory({
                    category: cat,
                    onRefresh,
                    onSelectCategory,
                  })
                }
                onAddSubcategory={(cat) =>
                  handleAddSubcategory(cat, onSelectCategory)
                }
              />
            ))}
          </SortableContext>
        </Box>

        <DragOverlay>
          {activeId && (
            <Box sx={styles.dragOverlay}>
              {categories.find((d) => d._id === activeId)?.name}
            </Box>
          )}
        </DragOverlay>
      </DndContext>
    </>
  );
}