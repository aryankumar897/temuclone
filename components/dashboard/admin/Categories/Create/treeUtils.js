export const buildTree = (data) => {
  const map = {};
  const roots = [];

  data.forEach((item) => {
    map[item._id] = { ...item, children: [] };
  });

  data.forEach((item) => {
    if (item.parent_id && map[item.parent_id]) {
      map[item.parent_id].children.push(map[item._id]);
    } else {
      roots.push(map[item._id]);
    }
  });

  const sortTree = (nodes) =>
    nodes
      .sort((a, b) => a.position - b.position)
      .map((n) => ({
        ...n,
        children: sortTree(n.children || []),
      }));

  return sortTree(roots);
};

export const getLevel = (categories, id) => {
  let level = 0;
  let current = categories.find((d) => d._id === id);

  while (current?.parent_id) {
    level++;
    current = categories.find((d) => d._id === current.parent_id);
  }

  return level;
};