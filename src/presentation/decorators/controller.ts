export const Controller = (path: string) =>
  function (constructorFunction: Function): void {
    constructorFunction.prototype.path = path;
  };
