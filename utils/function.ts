// Input paokue77@gmail.com => Output pa***77
export function maskEmail(email: string): string {
  const [name] = email.split("@");
  if (name.length <= 4) return email; // too short to mask

  const prefix = name.slice(0, 2);
  const suffix = name.slice(-2);
  return `${prefix}***${suffix}`;
}

// Helper function to format date for input[type="date"]
export const formatDateForInput = (
  dateString: string | null | undefined
): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return "";
  }
};
