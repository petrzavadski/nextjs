export interface IRacket {
  length: number;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  model: string;
  year: number;
  description: string;
  userData: { isFavorite: boolean };
}
