// utils/filterConfig.js  (or wherever you keep configs)

export const filterConfig = {


  color: {
    type: "includes",
    field: "color",
  },

  brand: {
    type: "includes",
    field: "brand",
  },

  rating: {
    type: "range",
    field: "rating",
  },

  price: {
    type: "price",
    field: "price",
  },
};