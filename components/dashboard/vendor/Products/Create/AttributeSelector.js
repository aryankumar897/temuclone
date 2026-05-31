// "use client";

// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   OutlinedInput,
// } from "@mui/material";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchAttributes } from "@/slice/attributeSlice";

// import FormInput from "@/components/form/FormInput";

// const AttributeSelector = ({ onChange, value }) => {
//   const dispatch = useDispatch();

//   const { list: attributes = [] } = useSelector((state) => state.attributes);

//   const [selectedAttrIds, setSelectedAttrIds] = useState([]);
//   const [selectedValues, setSelectedValues] = useState({});
//   const [customValues, setCustomValues] = useState({});

//   // 🔥 FETCH ATTRIBUTES
//   useEffect(() => {
//     dispatch(fetchAttributes());
//   }, [dispatch]);
//   useEffect(() => {
//     if (value) {
//       setSelectedAttrIds(value.attributeIds || []);
//       setSelectedValues(value.selectedAttributes || {});
//       setCustomValues(value.customAttributes || {});
//     }
//   }, [value]);
//   // ================= ATTRIBUTE MULTI SELECT =================
//   const handleAttributeSelect = (e) => {
//     const value = e.target.value;

//     setSelectedAttrIds(value);

//     onChange({
//       attributeIds: value,
//       selectedAttributes: selectedValues,
//       customAttributes: customValues,
//     });
//   };

//   // ================= VALUE MULTI SELECT =================
//   const handleValueSelect = (attrId, values) => {
//     const updated = {
//       ...selectedValues,
//       [attrId]: values,
//     };

//     setSelectedValues(updated);

//     onChange({
//       attributeIds: selectedAttrIds,
//       selectedAttributes: updated,
//       customAttributes: customValues,
//     });
//   };

//   // ================= TEXT / NUMBER =================
//   const handleCustom = (attrId, value) => {
//     const updated = {
//       ...customValues,
//       [attrId]: value,
//     };

//     setCustomValues(updated);

//     onChange({
//       attributeIds: selectedAttrIds,
//       selectedAttributes: selectedValues,
//       customAttributes: updated,
//     });
//   };

//   return (
//     <Box mt={3}>
//       <Typography variant="subtitle1">Attributes</Typography>

//       {/* 🔥 STEP 1: SELECT ATTRIBUTES */}
//       <Select
//         multiple
//         fullWidth
//         value={selectedAttrIds}
//         onChange={handleAttributeSelect}
//         input={<OutlinedInput />}
//         displayEmpty
//         renderValue={(selected) =>
//           selected.length === 0
//             ? "Select Attributes"
//             : attributes
//                 .filter((a) => selected.includes(a._id))
//                 .map((a) => a.name)
//                 .join(", ")
//         }
//         sx={{ mt: 1 }}
//       >
//         {attributes.map((attr) => (
//           <MenuItem key={attr._id} value={attr._id}>
//             <Checkbox checked={selectedAttrIds.includes(attr._id)} />
//             <ListItemText primary={attr.name} />
//           </MenuItem>
//         ))}
//       </Select>

//       {/* 🔥 STEP 2: SHOW ONLY SELECTED ATTRIBUTES */}
//       {attributes
//         .filter((attr) => selectedAttrIds.includes(attr._id))
//         .map((attr) => (
//           <Box key={attr._id} mt={2}>
//             <Typography mb={1}>{attr.name}</Typography>

//             {/* 🔥 SELECT / COLOR */}
//             {(attr.type === "select" || attr.type === "color") && (
//               <Select
//                 multiple
//                 fullWidth
//               value={selectedValues[attr._id] || []}
              
//                 onChange={(e) => handleValueSelect(attr._id, e.target.value)}
//                 input={<OutlinedInput />}
//                 renderValue={(selected) =>
//                   selected.length === 0
//                     ? `Select ${attr.name}`
//                     : selected.join(", ")
//                 }
//               >
//                 {attr.values.map((v) => (
//                   <MenuItem key={v.value} value={v.value}>
//                     <Checkbox
//                       checked={
//                         selectedValues[attr._id]?.includes(v.value) || false
//                       }
//                     />
//                     <ListItemText primary={v.label} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             )}

//             {/* 🔥 TEXT */}
//             {attr.type === "text" && (
//               <FormInput
//                 fullWidth
//                 placeholder={`Enter ${attr.name}`}
//                   value={customValues[attr._id] || ""}
//                 onChange={(e) => handleCustom(attr._id, e.target.value)}
//               />
//             )}

//             {/* 🔥 NUMBER */}
//             {attr.type === "number" && (
//               <FormInput
//                 fullWidth
//                 type="number"
//                 placeholder={`Enter ${attr.name}`}
//                   value={customValues[attr._id] || ""}
//                 onChange={(e) => handleCustom(attr._id, e.target.value)}
//               />
//             )}
//           </Box>
//         ))}
//     </Box>
//   );
// };

// export default AttributeSelector;









"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchAttributes } from "@/slice/attributeSlice";

import FormInput from "@/components/form/FormInput";

const AttributeSelector = ({ onChange, value }) => {
  const dispatch = useDispatch();

  const { list: attributes = [] } = useSelector(
    (state) => state.attributes
  );

  const [selectedAttrIds, setSelectedAttrIds] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [customValues, setCustomValues] = useState({});

  // 🔥 FETCH ATTRIBUTES
  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  // 🔥 PREFILL (IMPORTANT)
  useEffect(() => {
    if (value) {
      setSelectedAttrIds(value.attributeIds || []);
      setSelectedValues(value.selectedAttributes || {});
      setCustomValues(value.customAttributes || {});
    }
  }, [value]);

  // ================= ATTRIBUTE MULTI SELECT =================
  const handleAttributeSelect = (e) => {
    const value = e.target.value;

    setSelectedAttrIds(value);

    onChange({
      attributeIds: value,
      selectedAttributes: selectedValues,
      customAttributes: customValues,
    });
  };

  // ================= VALUE MULTI SELECT =================
  const handleValueSelect = (attrId, values) => {
    const updated = {
      ...selectedValues,
      [attrId.toString()]: values, // ✅ FIX: convert id to string
    };

    setSelectedValues(updated);

    onChange({
      attributeIds: selectedAttrIds,
      selectedAttributes: updated,
      customAttributes: customValues,
    });
  };

  // ================= TEXT / NUMBER =================
  const handleCustom = (attrId, value) => {
    const updated = {
      ...customValues,
      [attrId.toString()]: value, // ✅ FIX
    };

    setCustomValues(updated);

    onChange({
      attributeIds: selectedAttrIds,
      selectedAttributes: selectedValues,
      customAttributes: updated,
    });
  };

  return (
    <Box mt={3}>
      <Typography variant="subtitle1">Attributes</Typography>

      {/* 🔥 STEP 1: SELECT ATTRIBUTES */}
      <Select
        multiple
        fullWidth
        value={selectedAttrIds}
        onChange={handleAttributeSelect}
        input={<OutlinedInput />}
        displayEmpty
        renderValue={(selected) =>
          selected.length === 0
            ? "Select Attributes"
            : attributes
                .filter((a) => selected.includes(a._id))
                .map((a) => a.name)
                .join(", ")
        }
        sx={{ mt: 1 }}
      >
        {attributes.map((attr) => (
          <MenuItem key={attr._id} value={attr._id}>
            <Checkbox checked={selectedAttrIds.includes(attr._id)} />
            <ListItemText primary={attr.name} />
          </MenuItem>
        ))}
      </Select>

      {/* 🔥 STEP 2: SHOW ONLY SELECTED ATTRIBUTES */}
      {attributes
        .filter((attr) => selectedAttrIds.includes(attr._id))
        .map((attr) => (
          <Box key={attr._id} mt={2}>
            <Typography mb={1}>{attr.name}</Typography>

            {/* 🔥 SELECT / COLOR */}
            {(attr.type === "select" || attr.type === "color") && (
              <Select
                multiple
                fullWidth
                value={selectedValues[attr._id.toString()] || []} // ✅ FIX
                onChange={(e) =>
                  handleValueSelect(attr._id, e.target.value)
                }
                input={<OutlinedInput />}
                renderValue={(selected) =>
                  selected.length === 0
                    ? `Select ${attr.name}`
                    : selected.join(", ")
                }
              >
                {attr.values.map((v) => (
                  <MenuItem key={v.value} value={v.value}>
                    <Checkbox
                      checked={
                        selectedValues[attr._id.toString()]?.includes(
                          v.value
                        ) || false
                      } // ✅ FIX
                    />
                    <ListItemText primary={v.label} />
                  </MenuItem>
                ))}
              </Select>
            )}

            {/* 🔥 TEXT */}
            {attr.type === "text" && (
              <FormInput
                fullWidth
                placeholder={`Enter ${attr.name}`}
                value={customValues[attr._id.toString()] || ""} // ✅ FIX
                onChange={(e) =>
                  handleCustom(attr._id, e.target.value)
                }
              />
            )}

            {/* 🔥 NUMBER */}
            {attr.type === "number" && (
              <FormInput
                fullWidth
                type="number"
                placeholder={`Enter ${attr.name}`}
                value={customValues[attr._id.toString()] || ""} // ✅ FIX
                onChange={(e) =>
                  handleCustom(attr._id, e.target.value)
                }
              />
            )}
          </Box>
        ))}
    </Box>
  );
};

export default AttributeSelector;