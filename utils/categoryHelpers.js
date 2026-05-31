export const flattenCategories = (tree, level = 0) => {
  let result = [];

  tree.forEach((node) => {
    result.push({
      _id: node._id,
      name: `${"— ".repeat(level)}${node.name}`,
    });

    if (node.children?.length > 0) {
      result = result.concat(
        flattenCategories(node.children, level + 1)
      );
    }
  });

  return result;
};