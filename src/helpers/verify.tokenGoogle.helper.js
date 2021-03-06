import jwt from 'jsonwebtoken';
import response from './response.helper';
import UserServices from '../services/user.service';

const verifyGoogleTokens = async (req, res, next, token) => {
  if (!token) {
    return response.errorMessage(res, 'No token provided, Access Denied!', 401);
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const user = await UserServices.findUserByEmail(decodedToken.payload.phoneNumber);
    decodedToken.token = token;

    if (user === undefined) {
      return response.errorMessage(res, 'You provided the invalid token!', 401);
    }

    if (user.token !== token && user.token === null) {
      return response.successMessage(res, 'You need to signin first!', 401);
    }

    req.user = user;
    return next();
  } catch (error) {
    response.errorMessage(res, error.message, 401);
  }
};
export default verifyGoogleTokens;
