export const BookGenre = {
  ADVENTURE: 'Adventure',
  CLASSICS: 'Classics',
  COMICS: 'Comics',
  DETECTIVE: 'Detective',
  MYSTERY: 'Mystery',
  FANTASY: 'Fantasy',
  HISTORICAL: 'Historical',
  HORROR: 'Horror',
  FICTION: 'Fiction',
} as const;

export type BookGenre = typeof BookGenre[keyof typeof BookGenre];
