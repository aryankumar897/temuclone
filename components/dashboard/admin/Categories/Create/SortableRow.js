"use client";

import { Box, Typography, IconButton } from "@mui/material";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import styles from "./categoryTreestyles";

export default function SortableRow({
  item,
  level = 0,
  overId,
  position,
  openMap,
  setOpenMap,
  onEdit,
  onDelete,
  onAddSubcategory,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasChildren = item.children?.length > 0;
  const isOpen = openMap[item._id] ?? true;
  const isRoot = level === 0;
  const canAddSubcategory = isRoot;

  return (
    <>
      {overId === item._id && position === "before" && (
        <Box sx={styles.dropLine} />
      )}

      <Box
        ref={setNodeRef}
        style={style}
        sx={{
          ...styles.row,
          ...(level > 0 && styles.child),
          ...(isDragging && styles.dragging),
          pl: 2 + level * 3,
          cursor: "grab",
        }}
      >
        <Box sx={styles.left}>
          {hasChildren ? (
            <IconButton
              size="small"
              onClick={() =>
                setOpenMap((prev) => ({
                  ...prev,
                  [item._id]: !isOpen,
                }))
              }
            >
              {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </IconButton>
          ) : (
            <Box sx={{ width: 30 }} />
          )}

          <Box sx={styles.dragIcon} {...attributes} {...listeners}>
            <DragIndicatorIcon fontSize="small" />
          </Box>

          {isOpen && hasChildren ? (
            <FolderOpenOutlinedIcon sx={styles.folderIcon} />
          ) : (
            <FolderOutlinedIcon sx={styles.folderIcon} />
          )}

          <Typography sx={styles.name}>{item.name}</Typography>

          {!isRoot && (
            <Typography sx={styles.subcategoryBadge}>
              Subcategory
            </Typography>
          )}

          <Box sx={styles.actions}>
            {canAddSubcategory && (
              <IconButton
                size="small"
                onClick={() => onAddSubcategory(item)}
                sx={styles.actionIcon}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            )}

            <IconButton
              size="small"
              onClick={() => onEdit(item)}
              sx={styles.actionIcon}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => onDelete(item)}
              sx={styles.actionIcon}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {overId === item._id && position === "after" && (
        <Box sx={styles.dropLine} />
      )}

      {isOpen && hasChildren && (
        <SortableContext
          items={item.children.map((c) => c._id)}
          strategy={verticalListSortingStrategy}
        >
          {item.children.map((child) => (
            <SortableRow
              key={child._id}
              item={child}
              level={level + 1}
              overId={overId}
              position={position}
              openMap={openMap}
              setOpenMap={setOpenMap}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddSubcategory={onAddSubcategory}
            />
          ))}
        </SortableContext>
      )}
    </>
  );
}