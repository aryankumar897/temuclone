"use client";
// --- findDOMNode polyfill ---
if (typeof window !== "undefined") {
  try {
    const rd = require("react-dom");
    if (!rd.findDOMNode) {
      rd.findDOMNode = (inst) =>
        inst?.current ?? (inst && inst.nodeType === 1 ? inst : null);
    }
  } catch (e) {}
}

import { Box, Tooltip, IconButton } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write...",
  onGenerateAI,
  showAI = false,
  minHeight = 180,
  borderColor,
  styles,
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      {/* ✅ AI BUTTON (optional) */}
      {showAI && (
        <Tooltip title="Generate with AI">
          <IconButton
            onClick={onGenerateAI}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              color: "#f18220",
              backgroundColor: "#f5f3ff",
              "&:hover": { backgroundColor: "#ede9fe" },
            }}
          >
            <AutoAwesomeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {/* ✅ EDITOR */}
      <Box
        sx={{
          ...styles,
          border: borderColor
            ? `2px solid ${borderColor}`
            : "1px solid #e5e7eb",
          borderRadius: "4px",
          overflow: "hidden",

          "& .ql-toolbar": {
            borderBottom: "1px solid #e5e7eb",
          },

          "& .ql-container": {
            minHeight,
            fontSize: "14px",
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />
      </Box>
    </Box>
  );
};

export default RichTextEditor;
