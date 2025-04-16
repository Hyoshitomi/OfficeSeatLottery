import bcrypt from 'bcrypt';

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const password = 'mysecretpassword';
const hashedPassword = await hashPassword(password);
console.log(hashedPassword);