function callLogin(url, body) {
  /*
  try {
    // Promise 완료 시 까지 대기
    const response = await fetch(process.env.REACT_APP_HOST + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 수정
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('네트워크 요청에 실패했습니다');
    }

    const result = await response.json();
    // 로그인 정보 반환
    return {
      ok: true,
      status: response.status,
      userId: result.userId,
      role: result.role,
      token: result.token,
    };
  } catch (error) {
    console.log(error);
  }

  return {
    ok: false,
    status: response.status,
  };
*/

  return {
    ok: true,
    status: 200,
    userId: 'admin',
    role: 1111,
    token: 'start,...payload...,end',
  };
}

export default callLogin;
