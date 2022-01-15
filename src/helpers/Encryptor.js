import bcrypt from 'bcryptjs';

const EncryptPassword = (password) => {
  const saltRounds = 8;

  return bcrypt.hashSync(password, saltRounds);
};

export default EncryptPassword;
