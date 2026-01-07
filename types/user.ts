export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  gender?: 'boy' | 'girl' | null;
  dueDate?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
