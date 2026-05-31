// "use client";

// import { Grid, Box, Typography, Button } from "@mui/material";
// import CategoryAccordion from "./CategoryAccordion";
// import CategoryForm from "./CategoryForm";
// import styles from "./styles";

// export default function CategoryPage() {
//   return (
//     <Box sx={styles.page}>
//       {/* Header */}
//       <Box sx={styles.header}>
//         <Typography sx={styles.title}>Categories</Typography>
//         <Button variant="contained">New</Button>
//       </Box>

//       {/* Layout */}
//       <Grid container spacing={2}>
//         {/* LEFT SIDE */}
//         <Grid size={{ xs: 12, md: 5 }}>
//           <Box sx={styles.card}>
//             <CategoryAccordion />
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE */}
//         <Grid size={{ xs: 12, md: 7 }}>
//           <Box sx={styles.card}>
//             <CategoryForm />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { Grid, Box, Typography, Button } from "@mui/material";
// import { Toaster, toast } from "react-hot-toast";
// import CategoryTree from "./CategoryAccordion";
// import CategoryForm from "./CategoryForm";
// import styles from "./styles";

// export default function CategoryPage() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.API}/admin/categories`);
//       const result = await response.json();
      
//       if (result.success) {
//         setCategories(result.data);
//       } else {
//         toast.error("Failed to fetch categories!");
//       }
//     } catch (error) {
//       toast.error("Failed to fetch categories!");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleSaveCategory = async (savedCategory) => {
//     await fetchCategories();
//     setSelectedCategory(null);
//   };

//   const handleNewCategory = () => {
//     setSelectedCategory({});
//   };

//   return (
//     <Box sx={styles.page}>
//       <Toaster position="top-right" />
      
//       {/* Header */}
//       <Box sx={styles.header}>
//         <Typography sx={styles.title}>Categories</Typography>
//         <Button variant="contained" onClick={handleNewCategory}>
//           New Category
//         </Button>
//       </Box>

//       {/* Layout */}
//       <Grid container spacing={2}>
//         {/* LEFT SIDE - Category Tree */}
//         <Grid size={{ xs: 12, md: 5 }}>
//           <Box sx={styles.card}>
//             <Typography sx={styles.cardTitle}>Category Hierarchy</Typography>
//             {loading ? (
//               <Typography sx={{ p: 2 }}>Loading categories...</Typography>
//             ) : (
//               <CategoryTree
//                 categories={categories}
//                 onSelectCategory={setSelectedCategory}
//                 onRefresh={fetchCategories}
//               />
//             )}
//           </Box>
//         </Grid>

//         {/* RIGHT SIDE - Category Form */}
//         <Grid size={{ xs: 12, md: 7 }}>
//           <Box sx={styles.card}>
//             <CategoryForm
//               selectedCategory={selectedCategory}
//               onSave={handleSaveCategory}
//               categories={categories}
//             />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import CategoryTree from "./CategoryAccordion";
import CategoryForm from "./CategoryForm";

const styles = {
  page: {
    p: 3,
    bgcolor: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#333",
  },
  card: {
    bgcolor: "#ffffff",
    borderRadius: 2,
    p: 3,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#666",
    mb: 2,
    pb: 1,
    borderBottom: "1px solid #e0e0e0",
  },
};

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.API}/admin/categories`);
      const result = await response.json();
      
      if (result.success) {
        setCategories(result.data);
      } else {
        toast.error("Failed to fetch categories!");
      }
    } catch (error) {
      toast.error("Failed to fetch categories!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = async (savedCategory) => {
    await fetchCategories();
    setSelectedCategory(null);
  };

  const handleNewCategory = () => {
    setSelectedCategory({});
  };

  return (
    <Box sx={styles.page}>
      <Toaster position="top-right" />
      
      <Box sx={styles.header}>
        <Typography sx={styles.title}>Category Management</Typography>
        <Button variant="contained" onClick={handleNewCategory}>
          + New Category
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={styles.card}>
            <Typography sx={styles.cardTitle}>Category Hierarchy</Typography>
            {loading ? (
              <Typography>Loading categories...</Typography>
            ) : (
              <CategoryTree 
                categories={categories}
                onSelectCategory={setSelectedCategory}
                onRefresh={fetchCategories}
              />
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={styles.card}>
            <CategoryForm 
              selectedCategory={selectedCategory}
              onSave={handleSaveCategory}
              categories={categories}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}