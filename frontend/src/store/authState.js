import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: { token: null, username: null },
}); 

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});