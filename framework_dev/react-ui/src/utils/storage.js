// LocalStorage와 SessionStorage를 다루는 유틸리티

// 저장
export const setStorage = (key, value, useSession = false) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
    storage.setItem(key, valueToStore);
  } catch (error) {
    console.error('Storage set error:', error);
  }
};

// 불러오기
export const getStorage = (key, useSession = false) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    const storedValue = storage.getItem(key);
    if (storedValue) {
      // JSON.parse를 사용하여 객체로 반환
      return storedValue.startsWith('{') || storedValue.startsWith('[') ? JSON.parse(storedValue) : storedValue;
    }
    return null;
  } catch (error) {
    console.error('Storage get error:', error);
    return null;
  }
};

// 삭제
export const removeStorage = (key, useSession = false) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    storage.removeItem(key);
  } catch (error) {
    console.error('Storage remove error:', error);
  }
};

// 전체 삭제
export const clearStorage = (useSession = false) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    storage.clear();
  } catch (error) {
    console.error('Storage clear error:', error);
  }
};

// key가 존재하는지 확인
export const hasStorage = (key, useSession = false) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    return storage.getItem(key) !== null;
  } catch (error) {
    console.error('Storage has error:', error);
    return false;
  }
};
