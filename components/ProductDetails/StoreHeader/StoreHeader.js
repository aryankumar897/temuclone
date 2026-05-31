// "use client";

// import { Box, Avatar, Typography, Button } from "@mui/material";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import StarIcon from "@mui/icons-material/Star";
// import StoreIcon from "@mui/icons-material/Store";

// import styles from "./storeHeaderStyles";

// export default function StoreHeader() {
//   return (
//     <Box sx={styles.container}>
//       <Box sx={styles.row}>
//         <Avatar src="/images/img3.avif" sx={styles.avatar} />

//         <Box sx={styles.content}>
//           {/* Name + Chat */}
//           <Box sx={styles.nameRow}>
//             <Typography sx={styles.storeName}>
//               FuzzyFriendsS S
//             </Typography>

//             <Typography>|</Typography>

//             <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />

//             <Typography sx={styles.chatText}>
//               Chat
//             </Typography>
//           </Box>

//           {/* Stats */}
//           <Box sx={styles.statsRow}>
//             <Typography>
//               <b>60</b> Followers
//             </Typography>

//             <Typography>|</Typography>

//             <Typography>
//               <b>60K+</b> Sold
//             </Typography>

//             <Typography>|</Typography>

//             <Box display="flex" alignItems="center" gap={0.5}>
//               <Typography>4.9</Typography>
//               <StarIcon sx={{ fontSize: 16 }} />
//             </Box>
//           </Box>

//           {/* Buttons */}
//           <Box sx={styles.buttonRow}>
//             <Button sx={styles.followBtn}>Follow</Button>

//             <Button sx={styles.itemsBtn}>
//               All items (14)
//             </Button>
//           </Box>

//           {/* Join */}
//           <Box sx={styles.joinRow}>
//             <StoreIcon sx={{ fontSize: 18, color: "green" }} />

//             <Typography>
//               Store joined Temu 1 year ago
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }


"use client";

import { Box, Avatar, Typography, Button } from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import StarIcon from "@mui/icons-material/Star";

import StoreIcon from "@mui/icons-material/Store";

import styles from "./storeHeaderStyles";

export default function StoreHeader({ product }) {
  // 🔥 Check if admin product
  const isAdminProduct = !product?.store_id;

  // 🔥 Store data
  const store = product?.store_id;

  // 🔥 Dummy admin data
  const adminStore = {
    name: "Official Store",
    logo:
      "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",

    followers: "120K+",

    sold: "500K+",

    rating: 4.9,
  };

  // 🔥 Final data
  const storeName = isAdminProduct
    ? adminStore.name
    : store?.name || "Vendor Store";

  const storeLogo = isAdminProduct
    ? adminStore.logo
    : store?.logo ||
      "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";

  const followers = isAdminProduct
    ? adminStore.followers
    : "10K+";

  const sold = isAdminProduct
    ? adminStore.sold
    : "25K+";

  const rating = isAdminProduct
    ? adminStore.rating
    : product?.average_rating || 4.5;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.row}>
        {/* STORE LOGO */}

        <Avatar
          src={storeLogo}
          sx={styles.avatar}
        />

        <Box sx={styles.content}>
          {/* NAME */}

          <Box sx={styles.nameRow}>
            <Typography sx={styles.storeName}>
              {storeName}
            </Typography>

            <Typography>|</Typography>

            <ChatBubbleOutlineIcon
              sx={{ fontSize: 16 }}
            />

            <Typography sx={styles.chatText}>
              Chat
            </Typography>
          </Box>

          {/* STATS */}

          <Box sx={styles.statsRow}>
            <Typography>
              <b>{followers}</b> Followers
            </Typography>

            <Typography>|</Typography>

            <Typography>
              <b>{sold}</b> Sold
            </Typography>

            <Typography>|</Typography>

            <Box
              display="flex"
              alignItems="center"
              gap={0.5}
            >
              <Typography>{rating}</Typography>

              <StarIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>

          {/* BUTTONS */}

          <Box sx={styles.buttonRow}>
            <Button sx={styles.followBtn}>
              Follow
            </Button>

            <Button sx={styles.itemsBtn}>
              All items
            </Button>
          </Box>

          {/* JOIN INFO */}

          <Box sx={styles.joinRow}>
            <StoreIcon
              sx={{
                fontSize: 18,
                color: "green",
              }}
            />

            <Typography>
              {isAdminProduct
                ? "Official store on platform"
                : "Vendor store on platform"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}