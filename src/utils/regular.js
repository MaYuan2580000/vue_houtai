
//用户名正则判断
export function isvalidUser(Username) {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/;
    return reg.test(Username)
  }

  //密码正则判断

  export function isvalidPaswd(Password) {
    const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
    return reg.test(Password)
  }