export const MovieGenre = {
  ACTION: 'Action',
  CRIME: 'Crime',
  FANTASY: 'Fantasy',
  HORROR: 'Horror',
  ROMANCE: 'Romance',
  SCIENCE_FICTION: 'Science Fiction',
  COMEDY: 'Comedy',
  SPORTS: 'Sports',
  THRILLER: 'Thriller',
  WAR: 'War',
  WESTERN: 'Western',
} as const;

export type MovieGenre = typeof MovieGenre[keyof typeof MovieGenre];
