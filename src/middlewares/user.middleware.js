import response from '../helpers/response.helper';
import UserServices from '../services/user.service';
import comparePassword from '../helpers/Decryptor';
import GenerateToken from '../helpers/token.helper';

const checkEmailpassword = async (req, res) => {
  try{
    const user = await UserServices.findUserByEmail(req.body.email);
    if (user == null) {
      const status = 404;
      return response.errorMessage(res, 'User is not found', status);
    }
    if (!comparePassword(req.body.password, user.password)) {
      const status = 409;
      return response.errorMessage(res, 'Invalid Login Detail', status);
    }
    const isverifiedTrue = user.isVerified;

    if (!isverifiedTrue) {
      const status = 401;
      return response.errorMessage(res, 'User Is Not Verified, Please verify the User First', status);
    }

    const token =  GenerateToken({ email: req.body.email, isVerified: user.isVerified, id: user.id  })
    await user.update(token);
    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      manage:  user.manage,
      token
    };
    return response.successMessage(
        res,
        'user has logged in successfully',
        200,
        data
    );
  } catch (e) {
    return response.errorMessage(res, e.message, 400);
  }

};
export default checkEmailpassword;
