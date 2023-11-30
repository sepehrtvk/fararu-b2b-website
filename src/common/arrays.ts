import { ProductGroupModel } from "../api/product/types";
export const getLastTwoLevels = (
  data: ProductGroupModel[],
  levels: number = 2
): ProductGroupModel[] => {
  const result: ProductGroupModel[] = [];

  const traverse = (node: ProductGroupModel, currentLevel: number): void => {
    if (currentLevel === levels) {
      result.push(node);
      return;
    }

    if (node.submenus && node.submenus.length > 0) {
      for (const submenu of node.submenus) {
        traverse(submenu, currentLevel + 1);
      }
    }
  };

  data.forEach((item) => traverse(item, 0));

  return result;
};
