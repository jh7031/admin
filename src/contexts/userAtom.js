import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// Recoil 상태를 로컬 스토리지나 세션 스토리지에 저장(새로고침해도 Recoil 상태 유지)
//  - key: 스토리지에 저장될 키 이름
//  - storage: 저장할 스토리지 선택 (localStorage or sessionStorage)
const { persistAtom } = recoilPersist({
  key: 'user-persist',
  storage: sessionStorage,
});

export const UserAtom = atom({
  key: 'UserAtom',
  default: {
    userId: '',
    role: '',
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
});
