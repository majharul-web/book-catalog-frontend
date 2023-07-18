export const isBookCreatedBySame = (userId: string, bookUserId: string): boolean => {
  if (userId === bookUserId) {
    return true;
  }
  return false;
};
