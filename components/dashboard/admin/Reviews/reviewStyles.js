// reviewStyles.js

export const styles = {
  container: {
    p: 3,
  },

  title: {
    fontWeight: 600,
    mb: 3,
  },

  alert: {
    mb: 2,
  },

  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },

  mobileCard: {
    mb: 2,
    p: 2,
  },

  reviewText: {
    mb: 2,
  },

  dateText: {
    display: "block",
    mb: 2,
  },

  select: {
    minWidth: 120,
  },

  table: {
    minWidth: 650,
  },

  tableHead: (theme) => ({
    backgroundColor: theme.palette.grey[100],
  }),

  emptyCell: {
    py: 3,
  },

  avatar: (theme) => ({
    width: 32,
    height: 32,
    mr: 1,
    bgcolor: theme.palette.primary.main,
  }),

  reviewCell: {
    maxWidth: 300,
  },

  dialogCard: (theme) => ({
    p: 2,
    mt: 1,
    backgroundColor: theme.palette.grey[50],
  }),

  actionsBox: {
    display: "flex",
    gap: 1,
    justifyContent: "center",
  },
};