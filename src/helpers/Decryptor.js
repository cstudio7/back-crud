import bcrypt from 'bcrypt';

const comparePassword = (plainPwd, hashedPwd) => bcrypt.compare(plainPwd, hashedPwd);

export default comparePassword;
