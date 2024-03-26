export function sendEmail(userId: string) {
  return {
    success: true,
    emailId: Math.random().toString(36).substring(7),
  };
}
