const ApiErrorNames = {
  UnknownError: { code: -1, message: '未知错误' },
  UserNotExist: { code: 1001, message: '用户不存在' },
  UserNameNotNull: { code: 1002, message: '用户名不能为空' },
  UserIsExist: { code: 1003, message: '用户名已存在' },
  UserPassInvalid: { code: 1004, message: '用户密码填写有误' },
  UserEmailInvalid: { code: 1005, message: '邮箱格式不正确' },
  UserPassMinLength: { code: 1006, message: '密码长度不能小于6位' },
  UserPassMaxLength: { code: 1007, message: '密码长度不能大于12位' },
  UserTokenVaild: { code: 201, message: 'token过期' },
}

ApiErrorNames.getErrorInfo = (errorInfo) => {
  if (!errorInfo) {
    errorInfo = ApiErrorNames.UnknownError;
  }

  return errorInfo
}

export default ApiErrorNames