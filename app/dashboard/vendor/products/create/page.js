// "use client";

// import { Box } from "@mui/material";
// import CreateProduct from "@/components/dashboard/vendor/Products/Create/CreateProduct";

// export default function Page() {
//   return (
//     <Box p={2}>
//       <CreateProduct />
//     </Box>
//   );
// }


"use client";

import { Suspense } from "react";
import { Box } from "@mui/material";
import CreateProduct from "@/components/dashboard/vendor/Products/Create/CreateProduct";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <CreateProduct />
      </Box>
    </Suspense>
  );
}