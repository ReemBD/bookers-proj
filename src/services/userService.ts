import { BookersUser, SignupUser } from 'lib/models/User.interface';
import { storageService } from './storageService';

export const userService = {
  query,
  addUser,
  getUserById,
};

const STORAGE_KEY = 'userDB';

let gUsers: BookersUser[] = [];
_loadUsers();

function query() {
  return Promise.resolve(gUsers);
}

function getUserById(uid: string) {
  return gUsers.find((user) => user.id === uid);
}

function addUser({ uid, email, username, photo }: SignupUser) {
  const adapted = {
    id: uid,
    email,
    username,
    photo,
  };
  gUsers = [adapted, ...gUsers];
  _saveUsersToStorage();
  return Promise.resolve();
}

function _loadUsers() {
  let users = storageService.loadFromStorage(STORAGE_KEY);
  if (!users) users = _getDefaultUsers();
  gUsers = users;
  _saveUsersToStorage();
}

function _getDefaultUsers() {
  return [
    {
      username: 'Munters4ever',
      password: '123456',
      email: 'realemail@gmail.com',
    },
    {
      username: 'Pizza4ever',
      password: '123456',
      email: 'realemail2@gmail.com',
    },
    {
      username: 'Burger4ever',
      password: '123456',
      email: 'realemail3@gmail.com',
    },
  ];
}

function _saveUsersToStorage() {
  storageService.saveToStorage(STORAGE_KEY, gUsers);
}
