import * as bcrypt from 'bcrypt';

export function comparePasswords(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
