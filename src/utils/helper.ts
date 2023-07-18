export const isBookCreatedBySame = (userId: string, bookUserId: string): boolean => {
  if (userId === bookUserId) {
    return true;
  }
  return false;
};

export const bookReadStatus: string[] = ["plan to read soon", "currently reading", "finished reading"];

export const genreList: string[] = [
  "Novel",
  "Fiction",
  "Narrative",
  "Romance novel",
  "Science fiction",
  "Mystery",
];
