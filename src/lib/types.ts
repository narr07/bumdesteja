export interface UMKMItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  owner: string;
  location: string;
  contact: string;
  products: string[];
  established: string;
}
export interface WisataItem {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  price: string;
  facilities: string[];
  openHours: string;
  rating: number;
}
export interface ProgramItem {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  duration: string;
  participants: number;
  status: "active" | "completed" | "upcoming";
  startDate: string;
}
