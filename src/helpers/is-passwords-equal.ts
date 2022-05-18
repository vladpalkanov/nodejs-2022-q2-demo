import * as bcrypt from 'bcrypt';

export function isPasswordsEqual(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
