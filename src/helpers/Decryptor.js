import bcrypt from 'bcryptjs';

const comparePassword = (plainPwd, hashedPwd) => bcrypt.compareSync(plainPwd, hashedPwd);

export default comparePassword;
