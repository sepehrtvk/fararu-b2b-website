export const isEqual = <T>(left: T[], right: T[], fieldName: keyof T) => {
  return (
    left.length == right.length &&
    left.every((it, ix) => it[fieldName] == right[ix][fieldName])
  );
};
