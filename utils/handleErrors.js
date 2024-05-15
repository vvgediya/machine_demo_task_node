module.exports = function handleErrors(asyncFunction) {
  return async function (req, res, next) {
    try {
      return await asyncFunction(req, res, next);
    } catch (error) {
      console.log(error);
      if (next)
        return next(error);

      throw new Error(error.message);
    }
  };
};
