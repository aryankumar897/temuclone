// components/reviews/reviewStyles.js

export const styles = {
  wrapper: {
    maxWidth: 900,
    margin: "0 auto",
    padding: {
      xs: "12px",
      sm: "16px",
      md: "20px",
    },
    background: "#fff",
  },

  tabsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },

  tab: {
    border: "1px solid #dcdcdc",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: {
      xs: "12px",
      sm: "13px",
    },
    cursor: "pointer",
    background: "#fff",
    "&:hover": {
      background: "#f5f5f5",
    },
  },

  reviewItem: {
    display: "flex",
    gap: "12px",
    marginBottom: "26px",
  },

  avatar: {
    width: 36,
    height: 36,
    background: "#e0e0e0",
  },

  reviewContent: {
    flex: 1,
  },

  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    fontWeight: 500,
    flexWrap: "wrap",
  },

  flag: {
    width: "16px",
    height: "12px",
  },

  date: {
    fontSize: "13px",
    color: "#777",
  },

  stars: {
    fontSize: "16px",
    margin: "6px 0",
  },

  text: {
    fontSize: {
      xs: "13px",
      sm: "14px",
    },
    color: "#333",
    lineHeight: 1.6,
  },

  seeMore: {
    fontSize: "13px",
    color: "#1976d2",
    cursor: "pointer",
    marginTop: "4px",
    display: "inline-block",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },

  seeAllBtn: {
    borderRadius: "22px",
    textTransform: "none",
    border: "1px solid #dcdcdc",
    padding: "8px 24px",
    fontSize: "14px",
  },
};
