// // // "use client";

// // // import { Box } from "@mui/material";
// // // import ProductGallery from "@/components/ProductDetails/ProductGallery";
// // // import ProductInfo from "@/components/ProductDetails/ProductInfo";
// // // import ExploreDeals from "@/components/layout/ExploreDeals/ExploreProducts";
// // // import TopBar from "@/components/topbar/TopBar";

// // // import Header from "@/components/layout/Header/Header";

// // // export default function ProductPage() {
// // //   return (
// // //     <>
// // //       <TopBar />
// // //       <Header />
// // //       <Box
// // //         sx={{
// // //           maxWidth: "1400px",
// // //           margin: "40px auto",
// // //           display: "flex",
// // //           gap: "40px",
// // //           padding: "20px",
// // //           flexWrap: "wrap",
// // //         }}
// // //       >
// // //         <ProductGallery />

// // //         <ProductInfo />
// // //         <ExploreDeals />
// // //       </Box>
// // //     </>
// // //   );
// // // }

// // "use client";

// // import { useEffect, useState } from "react";

// // import { useSearchParams } from "next/navigation";

// // import { Box, CircularProgress, Typography } from "@mui/material";

// // import ProductGallery from "@/components/ProductDetails/ProductGallery";
// // import ProductInfo from "@/components/ProductDetails/ProductInfo";

// // import ExploreDeals from "@/components/layout/ExploreDeals/ExploreProducts";

// // import TopBar from "@/components/topbar/TopBar";

// // import Header from "@/components/layout/Header/Header";

// // export default function ProductPage() {
// //   const searchParams = useSearchParams();

// //   // 🔥 Get slug from URL
// //   const slug = searchParams.get("slug");

// //   const [product, setProduct] = useState(null);

// //   const [loading, setLoading] = useState(true);

// //   // 🔥 Fetch product
// //   useEffect(() => {
// //     if (!slug) return;

// //     const fetchProduct = async () => {
// //       try {
// //         setLoading(true);

// //         const res = await fetch(`${process.env.API}/products/${slug}`);

// //         const data = await res.json();

// //         if (data.success) {
// //           setProduct(data.product);
// //         }
// //       } catch (error) {
// //         console.log(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, [slug]);

// //   // 🔥 Loading state
// //   if (loading) {
// //     return (
// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           height: "80vh",
// //         }}
// //       >
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   // ❌ Product not found
// //   if (!product) {
// //     return (
// //       <Typography
// //         sx={{
// //           textAlign: "center",
// //           mt: 10,
// //           fontSize: "24px",
// //           fontWeight: 600,
// //         }}
// //       >
// //         Product not found
// //       </Typography>
// //     );
// //   }

// //   return (
// //     <>
// //       <TopBar />

// //       <Header />

// //       <Box
// //         sx={{
// //           maxWidth: "1400px",
// //           margin: "40px auto",
// //           display: "flex",
// //           gap: "40px",
// //           padding: "20px",
// //           flexWrap: "wrap",
// //         }}
// //       >
// //         {/* 🔥 Pass product */}

// //         <ProductGallery product={product} />

// //         <ProductInfo product={product} />

// //         <ExploreDeals />
// //       </Box>
// //     </>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";

// import { useSearchParams } from "next/navigation";

// import { Box, CircularProgress, Typography } from "@mui/material";

// import ProductGallery from "@/components/ProductDetails/ProductGallery";

// import ProductInfo from "@/components/ProductDetails/ProductInfo";

// import ExploreDeals from "@/components/layout/ExploreDeals/ExploreProducts";

// import TopBar from "@/components/topbar/TopBar";

// import Header from "@/components/layout/Header/Header";

// export default function ProductPage() {
//   const searchParams = useSearchParams();

//   // 🔥 GET SLUG
//   const slug = searchParams.get("slug");

//   const [product, setProduct] = useState(null);

//   const [variants, setVariants] = useState([]);

//   const [selectedVariant, setSelectedVariant] = useState(null);

//   const [loading, setLoading] = useState(true);

//   // 🔥 FETCH PRODUCT
//   useEffect(() => {
//     if (!slug) return;

//     const fetchProduct = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`${process.env.API}/products/${slug}`);

//         const data = await res.json();

//         if (data.success) {
//           setProduct(data.product);

//           setVariants(data.variants || []);

//           // 🔥 AUTO SELECT FIRST VARIANT
//           if (data.variants?.length > 0) {
//             setSelectedVariant(data.variants[0]);
//           }
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [slug]);

//   // 🔥 LOADING
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // ❌ PRODUCT NOT FOUND
//   if (!product) {
//     return (
//       <Typography
//         sx={{
//           textAlign: "center",
//           mt: 10,
//           fontSize: "24px",
//           fontWeight: 600,
//         }}
//       >
//         Product not found
//       </Typography>
//     );
//   }

//   return (
//     <>
//       <TopBar />

//       <Header />

//       <Box
//         sx={{
//           maxWidth: "1400px",
//           margin: "40px auto",
//           display: "flex",
//           gap: "40px",
//           padding: "20px",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* 🔥 PRODUCT GALLERY */}

//         <ProductGallery product={product} selectedVariant={selectedVariant} />

//         {/* 🔥 PRODUCT INFO */}

//         <ProductInfo
//           product={product}
//           variants={variants}
//           selectedVariant={selectedVariant}
//           setSelectedVariant={setSelectedVariant}
//         />

//         <ExploreDeals />
//       </Box>
//     </>
//   );
// }


"use client";

import { Suspense } from "react";
import ProductContent from "./ProductContent";

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}