import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import EmailIcon from "@mui/icons-material/Email";
import CampaignIcon from "@mui/icons-material/Campaign";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export const menuGroups = [
  {
    title: "User Management",
    icon: <PeopleIcon />,
    paths: ["users", "vendors"],
    items: [
      { label: "Users", path: "users", icon: <PeopleIcon /> },
      { label: "Vendors", path: "vendors", icon: <StoreIcon /> },
    ],
  },
  {
    title: "Category Management",
    icon: <CategoryIcon />,
    paths: ["categories", "subcategories"],
    items: [
      { label: "Categories", path: "categories", icon: <CategoryIcon /> },
      {
        label: "Subcategories",
        path: "subcategories",
        icon: <CategoryIcon />,
      },
    ],
  },

{
  title: "Product Management",
  icon: <InventoryIcon />,
  paths: ["tags", "brands", "products", "attributes"], // ✅ added attributes
  items: [
    {
      label: "Tag",
      path: "tags/list",
      icon: <LocalOfferIcon />,
    },
    {
      label: "Brand",
      path: "brands/list",
      icon: <BrandingWatermarkIcon />,
    },
    {
      label: "Product",
      path: "products/list",
      icon: <ShoppingCartIcon />,
    },
    {
      label: "Attribute", // ✅ new item
      path: "attributes/list",
      icon: <CategoryIcon />, // or TuneIcon / ListAltIcon if you prefer
    },
  ],
},
  {
    title: "KYC Management",
    icon: <VerifiedUserIcon />,
    paths: ["kyc"], // ✅ important for active state
    items: [
      {
        label: "All KYC",
        path: "kyc",
        icon: <VerifiedUserIcon />,
      },
    ],
  },

  {
    title: "Coupons & Offers",
    icon: <LocalOfferIcon />,
    paths: ["coupons", "offers"],
    items: [
      { label: "Coupons", path: "coupons/list", icon: <LocalOfferIcon /> },
      { label: "Offers", path: "offers", icon: <CampaignIcon /> },
    ],
  },
  {
    title: "Banner Management",
    icon: <BrandingWatermarkIcon />,
    paths: ["banners"],
    items: [
      { label: "Banners", path: "banners", icon: <BrandingWatermarkIcon /> },
    ],
  },

  {
    title: "Marketing",
    icon: <EmailIcon />,
    paths: ["emails", "campaigns"],
    items: [
      { label: "Emails", path: "emails", icon: <EmailIcon /> },
      { label: "Campaigns", path: "campaigns", icon: <CampaignIcon /> },
    ],
  },
];
