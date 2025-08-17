export interface UserModel {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'customer';
  avatar: string;
}
