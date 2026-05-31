const styles = {
  page: {
    backgroundColor: "#ffffff",
    padding: {
      xs: "16px", // 📱 mobile
      sm: "24px",
      md: "56px", // 💻 desktop
    },
    margin: {
      xs: "0px",
      sm: "16px",
      md: "40px",
    },
  },

  avatarWrapper: {
    textAlign: "center",
    mb: 3,
  },

  avatar: {
    width: 110,
    height: 110,
    margin: "auto",
    mb: 1,
    border: "3px solid #eee",
  },

  uploadBtn: {
    display: "inline-block",
    px: 14,
    py: 1,
    fontSize: "13px",
    fontWeight: 600,
    color: "#fff",
    bgcolor: "#f17006",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      bgcolor: "#ef8605",
    },
  },

  hiddenInput: {
    display: "none",
  },

  header: {
    display: "flex",
    flexDirection: {
      xs: "column", // 📱 stack title & button
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
    marginBottom: "12px",
  },

  title: {
    fontSize: {
      xs: "14px",
      sm: "16px",
    },
    fontWeight: 600,
    color: "#111827",
  },

  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: {
      xs: "12px",
      sm: "16px",
    },
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
      xs: "stretch", // 📱 full-width button
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
