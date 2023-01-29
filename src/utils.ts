export const pipeUntilResults = <T extends (...args: U[]) => V | null, U, V>(
  ...functions: T[]
) => {
  return (args: U) => {
    for (const currentFunction of functions) {
      const result = currentFunction(args);
      if (result) {
        return result;
      }
    }

    return null;
  };
};
