const ApiErrorNames = {
  UnknownError: { code: -1, message: '未知错误' },
  UserNotExist: { code: 1001, message: '用户不存在' },
  UserNameNotNull: { code: 1002, message: '用户名不能为空' },
  UserIsExist: { code: 1003, message: '用户名已存在' },
  UserPassInvalid: { code: 1004, message: '用户密码填写有误' }
}

ApiErrorNames.getErrorInfo = (errorInfo) => {
  if (!errorInfo) {
    errorInfo = ApiErrorNames.UnknownError;
  }

  return errorInfo
}

export default ApiErrorNames