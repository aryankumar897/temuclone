"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { deleteVariant } from "@/slice/vendorvariantSlice";

const VariantAccordion = ({ variants }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (!variants?.length) return null;

  // 🗑 delete
  const handleDelete = (id) => {
    if (!confirm("Delete this variant?")) return;
    dispatch(deleteVariant(id));
  };

  // ✏️ edit
  const handleEdit = (id) => {
    router.push(`/dashboard/vendor/products/variants/edit?id=${id}`);
  };

  return (
    <Accordion sx={{ mt: 1, bgcolor: "#fafafa" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>Variants ({variants.length})</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {variants.map((v) => (
          <Box
            key={v._id}
            sx={{
              border: "1px solid #eee",
              borderRadius: 2,
              p: 1.5,
              mb: 1,
            }}
          >
            {/* TOP ROW */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Attributes */}
              <Typography fontSize={13} fontWeight={500}>
                {v.attributes
                  ?.map((a) => `${a.attribute?.name}: ${a.value}`)
                  .join(" / ")}
              </Typography>

              {/* ACTIONS */}
              <Box>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(v._id)}
                  sx={{ color: "#2563EB" }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => handleDelete(v._id)}
                  sx={{ color: "#B91C1C" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Price */}
            <Typography fontSize={12}>₹{v.special_price || v.price}</Typography>
            {/* STATUS */}
            <Typography
              sx={{
                display: "inline-block",
                fontSize: 11,
                px: 1,
                py: 0.3,
                borderRadius: 1,
                mt: 0.5,
                bgcolor: v.status === "active" ? "#DCFCE7" : "#FEE2E2",
                color: v.status === "active" ? "#166534" : "#991B1B",
                fontWeight: 500,
                width: "fit-content",
              }}
            >
              {v.status === "active" ? "Active" : "Inactive"}
            </Typography>
            {/* Stock */}
            <Typography fontSize={12}>Stock: {v.stock}</Typography>

            {/* SKU */}
            <Typography fontSize={11} color="gray">
              {v.sku}
            </Typography>

            {/* Media */}
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {v.media
                ?.slice(0, 2)
                .map((m) =>
                  m.type === "image" ? (
                    <img
                      key={m._id}
                      src={m.url}
                      width={35}
                      height={35}
                      style={{ borderRadius: 4 }}
                    />
                  ) : (
                    <video
                      key={m._id}
                      src={m.url}
                      width={35}
                      height={35}
                      style={{ borderRadius: 4 }}
                    />
                  ),
                )}
            </Box>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default VariantAccordion;
