"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Drawer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { drawerStyles as s } from "./filterDrawerStyles";

export default function FilterDrawer({
  open,
  onClose,
  filters,
  filterOptions,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState({});
  const [showMore, setShowMore] = useState({});

  // ✅ LOAD FROM URL
  useEffect(() => {
    const obj = {};
    for (const key of searchParams.keys()) {
      obj[key] = searchParams.get(key).split(",");
    }
    setSelected(obj);
  }, [searchParams]);

  const toggle = (key, value) => {
    const current = selected[key] || [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setSelected({ ...selected, [key]: updated });
  };

  const applyFilters = () => {
    const query = new URLSearchParams();

    Object.entries(selected).forEach(([k, v]) => {
      if (v.length) query.set(k, v.join(","));
    });

    router.push(`/category?${query.toString()}`);
    onClose();
  };

  const total = Object.values(selected).flat().length;

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={s.container}>
        {/* HEADER */}
        <Box sx={s.header}>
          <Typography sx={s.title}>Filters</Typography>
          <Typography onClick={onClose}>✕</Typography>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {filters.map((filter) => {
            if (
              filter === "Filters" ||
              filter.toLowerCase().includes("sort")
            )
              return null;

            const options = filterOptions[filter];
            if (!options) return null;

            const key = filter.toLowerCase();
            const expanded = showMore[key];

            return (
              <Box key={filter} sx={s.section}>
                <Typography sx={s.sectionTitle}>
                  {filter}
                </Typography>

                {/* ✅ COLOR UI */}
                {filter === "Color" && (
                  <Box sx={s.colorWrap}>
                    {options.map((c) => (
                      <Box
                        key={c}
                        onClick={() => toggle(key, c)}
                        sx={s.colorCircle(
                          c.toLowerCase(),
                          selected[key]?.includes(c),
                        )}
                      />
                    ))}
                  </Box>
                )}

                {/* ✅ RATING UI */}
                {filter === "Rating" &&
                  options.map((r) => (
                    <Box
                      key={r}
                      sx={s.radioItem}
                      onClick={() => toggle(key, r)}
                    >
                      <Box
                        sx={s.radioCircle(
                          selected[key]?.includes(r),
                        )}
                      />
                      {"★".repeat(Number(r[0]))} & up
                    </Box>
                  ))}

                {/* ✅ DEFAULT RADIO UI */}
                {!["Color", "Rating"].includes(filter) &&
                  (expanded ? options : options.slice(0, 5)).map(
                    (opt) => (
                      <Box
                        key={opt}
                        sx={s.radioItem}
                        onClick={() => toggle(key, opt)}
                      >
                        <Box
                          sx={s.radioCircle(
                            selected[key]?.includes(opt),
                          )}
                        />
                        {opt}
                      </Box>
                    ),
                  )}

                {/* VIEW MORE */}
                {options.length > 5 &&
                  filter !== "Color" &&
                  filter !== "Rating" && (
                    <Typography
                      sx={s.viewMore}
                      onClick={() =>
                        setShowMore({
                          ...showMore,
                          [key]: !expanded,
                        })
                      }
                    >
                      {expanded ? "View Less" : "+ View More"}
                    </Typography>
                  )}
              </Box>
            );
          })}
        </Box>

        {/* FOOTER */}
        <Box sx={s.footer}>
          <Box sx={s.resetBtn} onClick={() => setSelected({})}>
            Reset
          </Box>

          <Box sx={s.applyBtn} onClick={applyFilters}>
            Show {total || 1000}+ results
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
