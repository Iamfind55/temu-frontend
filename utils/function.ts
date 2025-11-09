// Input paokue77@gmail.com => Output pa***77
export function maskEmail(email: string): string {
  const [name] = email.split("@");
  if (name.length <= 4) return email; // too short to mask

  const prefix = name.slice(0, 2);
  const suffix = name.slice(-2);
  return `${prefix}***${suffix}`;
}
