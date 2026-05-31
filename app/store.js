import { configureStore } from "@reduxjs/toolkit";

import tagReducer from "@/slice/tagSlice";

import brandReducer from "@/slice/brandSlice"; // ✅ add this
import attributeReducer from "@/slice/attributeSlice";
import productReducer from "@/slice/productSlice";
import variantReducer from "@/slice/variantSlice"; // ✅ ADD THIS
import vendorReducer from "@/slice/vendorSlice";
import vendorvariantReducer from "@/slice/vendorvariantSlice";
// ✅ IMPORT COUPON SLICE
import couponReducer from "@/slice/couponSlice";
// ✅ ADDRESS
import addressReducer from "@/slice/addressSlice";
import cartReducer from "@/slice/cartSlice";

import checkoutAddressReducer from "@/slice/checkoutAddressSlice";

import orderReducer from "@/slice/orderSlice";
import adminOrderReducer from "@/slice/adminOrderSlice";
export const store = configureStore({
  reducer: {
    tags: tagReducer,
    brands: brandReducer, // ✅ add this
    attributes: attributeReducer,
    products: productReducer, // ✅ add this
    variants: variantReducer,
    vendors: vendorReducer,

    vendorvariant: vendorvariantReducer,
    // ✅ ADD COUPONS
    coupons: couponReducer,
    // ✅ ADDRESS
    addresses: addressReducer,

    cart: cartReducer,
    checkoutAddress: checkoutAddressReducer,

    orders: orderReducer,
    adminOrders: adminOrderReducer,
  },
});
