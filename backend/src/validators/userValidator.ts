
export async function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function validatePhone(phone: string) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

export async function validatePassword(password: string) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
}