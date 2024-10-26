import asyncHandler from "../utils/asyncHandler";
import emailValidator from "../validators/email.validator";

const validateEmail = asyncHandler(async (req, res, next) => {
  emailValidator.parse(req.params.email || req.query.email || "");
  next();
});
export default validateEmail;
