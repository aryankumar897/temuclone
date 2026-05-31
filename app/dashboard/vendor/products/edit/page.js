// "use client";

// import { Box } from "@mui/material";
// import EditProduct from "@/components/dashboard/vendor/Products/Edit/EditProduct";

// export default function Page() {
//   return (
//     <Box p={2}>
//       <EditProduct />
//     </Box>
//   );
// }


"use client";

import { Suspense } from "react";
import { Box } from "@mui/material";
import EditProduct from "@/components/dashboard/vendor/Products/Edit/EditProduct";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <EditProduct />
      </Box>
    </Suspense>
  );
}