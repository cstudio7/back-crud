import bcrypt from 'bcryptjs';

const EncryptPassword = (password) => {
  const saltRounds = 15;

  return bcrypt.hashSync(password, saltRounds);
};

export default EncryptPassword;
