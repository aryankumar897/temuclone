// "use client";

// import { Box } from "@mui/material";
// import EditVariant from "@/components/dashboard/vendor/Products/Variants/Edit/EditVariant";

// export default function Page() {
//   return (
//     <Box p={2}>
//       <EditVariant />
//     </Box>
//   );
// }


"use client";

import { Suspense } from "react";
import { Box } from "@mui/material";
import EditVariant from "@/components/dashboard/vendor/Products/Variants/Edit/EditVariant";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box p={2}>
        <EditVariant />
      </Box>
    </Suspense>
  );
}