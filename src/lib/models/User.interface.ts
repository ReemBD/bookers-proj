import { User, UserProfile } from 'firebase/auth';

export interface UserPhoto {
  photoURL: string | null;
  photoId: string | null;
}
export interface BookersUser {
  id: string;
  email: string | null;
  username: string;
  photo: UserPhoto;
  // TBI
  idBooks?: string[];
  idReviews?: string[];
}

export interface UserCred {
  email: string;
  password: string;
}

export interface SignupUser extends User {
  username: string;
  photo: UserPhoto;
}

export interface SignupForm extends UserCred {
  matchPassword: string;
  username: string;
  photo: UserPhoto;
}
