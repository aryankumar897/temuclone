export const profileUpdateStyles = {
  wrapper: {
    width: "100%",
    p: { xs: 2, sm: 3 },
    bgcolor: "#F7FBFF",
    mx: "auto",
    maxWidth: 600,
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },

  headerTitle: {
    fontSize: { xs: "18px", sm: "20px" },
    fontWeight: 700,
    color: "#060403",
    mb: 2,
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

  formGrid: {
    display: "grid",
    gap: 2,
  },

  buttonWrap: {
    mt: 2,
  },
};