// "use client";
// import { Box } from "@mui/material";
// import SidebarVendor from "@/components/dashboard/vendor/SidebarVendor";

// // ✅ import styles
// import styles from "./vendorLayoutStyles";

// export default function Layout({ children }) {
//   return (
//     <Box sx={styles.root}>
//       {/* CENTER WRAPPER */}
//       <Box sx={styles.wrapper}>
        
//         {/* MAIN FLEX LAYOUT */}
//         <Box sx={styles.layout}>
          
//           {/* Sidebar */}
//           <SidebarVendor />

//           {/* Content */}
//           <Box sx={styles.content}>
//             {children}
//           </Box>
//         </Box>

//       </Box>
//     </Box>
//   );
// }

"use client";

import { Suspense } from "react";
import { Box } from "@mui/material";
import SidebarVendor from "@/components/dashboard/vendor/SidebarVendor";

import styles from "./vendorLayoutStyles";

export default function Layout({ children }) {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.layout}>
          <Suspense fallback={null}>
            <SidebarVendor />
          </Suspense>

          <Box sx={styles.content}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}