// app/dashboard/admin/address/addressStyles.js

const styles = {
  page: {
    backgroundColor: "#ffffff",
    padding: {
      xs: "16px",
      sm: "24px",
      md: "56px",
    },
    margin: {
      xs: "0px",
      sm: "16px",
      md: "40px",
    },
  },

  header: {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    alignItems: {
      xs: "flex-start",
      sm: "center",
    },
    justifyContent: "space-between",
    gap: {
      xs: "8px",
      sm: "0px",
    },
    marginBottom: "20px",
  },

  title: {
    fontSize: {
      xs: "18px",
      sm: "24px",
    },
    fontWeight: 700,
    color: "#111827",
  },

  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: {
      xs: "16px",
      sm: "20px",
    },
    boxShadow: "none",
  },

  addressCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    p: 2,
    height: "100%",
    transition: "0.3s",

    "&:hover": {
      borderColor: "#f17006",
    },
  },

  name: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#111827",
  },

  phone: {
    fontSize: "14px",
    color: "#6b7280",
    mt: 0.5,
  },

  address: {
    fontSize: "14px",
    color: "#374151",
    mt: 1,
    lineHeight: 1.7,
  },

  chipRow: {
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
    mt: 2,
  },

  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 1,
    mt: 2,
  },

  divider: {
    my: {
      xs: 1.5,
      sm: 2,
    },
  },

  actions: {
    display: "flex",
    justifyContent: {
      xs: "stretch",
      sm: "flex-end",
    },
    mt: 3,

    "& button": {
      width: {
        xs: "100%",
        sm: "auto",
      },
    },
  },
};

export default styles;