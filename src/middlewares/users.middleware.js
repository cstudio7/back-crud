import response from '../helpers/response.helper';
import comparePassword from '../helpers/Decryptor';
import GenerateToken from '../helpers/token.helper';
import db from "../database/models";

const checkEmailpassword = async (req, res) => {
  const { email } = req.body
  const user = await db.coach.findOne({
    where: { email }
  });
  console.log(user)
  if (!user) {
    const status = 404;
    return response.errorMessage(res, 'User is not found', status);
  }
  if (!comparePassword(req.body.password, user.password)) {
    const status = 409;
    return response.errorMessage(res, 'Invalid Login Detail', status);
  }

  const token = GenerateToken({ email: req.body.email, isVerified: user.isVerified, id: user.id, authType: user.authType, firstName: user.firstName, lastName: user.lastName });
  const data = {
    token,
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName
  }
  return response.successMessage(
      res,
      'user has logged in successfully',
      200,
      data
  );
};
export default checkEmailpassword;
