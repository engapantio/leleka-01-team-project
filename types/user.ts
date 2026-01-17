export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  gender?: 'boy' | 'girl' | null;
  dueDate?: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}
export interface editProfileData {
  name?: string;
  gender?: 'boy' | 'girl' | null;
  dueDate?: string;
}
