export const calculatePasswordQuality = (pwd: string): string => {
  if (pwd.length === 0) return "-";
  if (pwd.length < 8) return "Weak";

  let strength = 0;
  if (pwd.length >= 12) strength++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
  if (/\d/.test(pwd)) strength++;
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

  if (strength >= 3) return "Strong";
  if (strength >= 2) return "Medium";
  return "Weak";
};
