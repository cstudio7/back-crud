import response from '../helpers/response.helper';
import comparePassword from '../helpers/Decryptor';
import GenerateToken from '../helpers/token.helper';
import db from "../database/models";

const checkEmailpassword = async (req, res) => {
  const { email } = req.body
  const user = await db.user.findOne({
    where: { email }
  });
  if (!user) {
    const status = 404;
    return response.errorMessage(res, 'User is not found', status);
  }
  if (!comparePassword(req.body.password, user.password)) {
    const status = 409;
    return response.errorMessage(res, 'Invalid Login Detail', status);
  }

  const token = GenerateToken({ email: req.body.email, isVerified: user.isVerified, id: user.id, authType: user.authType, firstName: user.firstName, lastName: user.lastName });
  return response.successMessage(
      res,
      'user has logged in successfully',
      200,
      token
  );
};
export default checkEmailpassword;
