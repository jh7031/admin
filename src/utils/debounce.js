// timeout 최종 함수만 호출
function debounce(fn, delay = 300) {
  // 클로저
  let timeout;

  return (...args) => {
    let result;
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      result = fn.apply(this, args);
    }, delay);

    return result;
  };
}

export default debounce;
