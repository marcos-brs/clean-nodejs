export const Controller = (path: string) =>
  function (constructorFunction: Function) {
    constructorFunction.prototype.path = path;
  };
