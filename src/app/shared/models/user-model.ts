export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
