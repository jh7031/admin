function getFetch(url, callback) {
  // 비동기 통신, promise 반환
  fetch(process.env.REACT_APP_HOST + url, { method: 'GET' })
    .then((res) => {
      return res.json(); // json으로 받을 것을 명시
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default getFetch;
