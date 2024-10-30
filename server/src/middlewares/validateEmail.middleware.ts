import asyncHandler from "../utils/asyncHandler.js";
import emailValidator from "../validators/email.validator.js";

const validateEmail = asyncHandler(async (req, res, next) => {
  emailValidator.parse(req.params.email || req.query.email || "");
  next();
});
export default validateEmail;
