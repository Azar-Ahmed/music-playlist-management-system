import CustomError from '../utils/customError.utils.js';

const notFound = (req, res, next) => {
  next(new CustomError(`Not Found - ${req.originalUrl}`, 404));
};

export default notFound;
