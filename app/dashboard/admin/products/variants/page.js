// "use client";

// import { Box } from "@mui/material";
// import CreateVariant from "@/components/dashboard/admin/Products/Variants/CreateVariant";

// export default function Page() {
//   return (
//     <Box p={2}>
//       <CreateVariant />
//     </Box>
//   );
// }


"use client";

import { Suspense } from "react";
import { Box } from "@mui/material";
import CreateVariant from "@/components/dashboard/admin/Products/Variants/CreateVariant";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <CreateVariant />
      </Box>
    </Suspense>
  );
}