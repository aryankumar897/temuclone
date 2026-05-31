"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Checkbox } from "@mui/material";

import { buildTree } from "@/components/dashboard/admin/Categories/Create/treeUtils";

const CategorySelector = ({ value = [], onChange }) => {
  const [categories, setCategories] = useState([]);
  const [tree, setTree] = useState([]);

  // 🔥 FETCH
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.API}/admin/categories`);
      const result = await res.json();

      if (result.success) {
        setCategories(result.data);
        setTree(buildTree(result.data));
      }
    };

    fetchCategories();
  }, []);

  // ================= SELECT LOGIC =================

  const getAllChildren = (node) => {
    let ids = [node._id];

    node.children?.forEach((child) => {
      ids = ids.concat(getAllChildren(child));
    });

    return ids;
  };

  const handleToggle = (node) => {
    const ids = getAllChildren(node);

    let updated;

    const isSelected = ids.every((id) => value.includes(id));

    if (isSelected) {
      // 🔥 REMOVE ALL
      updated = value.filter((id) => !ids.includes(id));
    } else {
      // 🔥 ADD ALL
      updated = [...new Set([...value, ...ids])];
    }

    onChange(updated);
  };

  const isChecked = (node) => {
    return value.includes(node._id);
  };

  // ================= RENDER =================

  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => (
      <Box key={node._id} sx={{ pl: level * 2, mt: 1 }}>
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={isChecked(node)}
            onChange={() => handleToggle(node)}
          />
          <Typography>{node.name}</Typography>
        </Box>

        {node.children?.length > 0 &&
          renderTree(node.children, level + 1)}
      </Box>
    ));
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1">Categories</Typography>
      {renderTree(tree)}
    </Box>
  );
};

export default CategorySelector;