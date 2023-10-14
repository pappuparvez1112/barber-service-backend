import { IUserRole } from './user.interface';

export const UserRole: IUserRole[] = ['user', 'admin'];
export const UserBudget = 30000;
export const userSearchableFields = [
  'id',
  'phoneNumber',
  'name.firstName',
  'name.lastName',
];
export const userFilterableFields = [
  'searchTerm',
  'id',
  'phoneNumber',
  'name.firstName',
  'name.lastName',
];
