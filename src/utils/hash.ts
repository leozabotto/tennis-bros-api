import bcrypt from 'bcrypt';

export function transformToHash(value: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);

  return hash;
}
