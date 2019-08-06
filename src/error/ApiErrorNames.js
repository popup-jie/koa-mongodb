const ApiErrorNames = {
  UnknownError: { code: -1, message: '未知错误' },
  UserNotExist: { code: 1001, message: '用户不存在' },
  UserNameNotNull: { code: 1002, message: '用户名不能为空' },
  UserIsExist: { code: 1003, message: '用户名已存在' },
  UserPassInvalid: { code: 1004, message: '用户密码填写有误' },
  UserEmailInvalid: { code: 1005, message: '邮箱格式不正确' },
  UserPassMinLength: { code: 1006, message: '密码长度不能小于6位' },
  UserPassMaxLength: { code: 1007, message: '密码长度不能大于12位' },
  UserTokenVaild: { code: -201, message: 'token过期' },

  ArticleCoverVaild: { code: 3001, message: '文章封面图片路径无效' },
  ArticleTitleVaild: { code: 3002, message: '文章标题不能为空' },
  ArticleLabelVaild: { code: 3003, message: '文章标签不能为空' },
  ArticleSubareaVaild: { code: 3004, message: '文章分区不能为空' },
  ArticleResourceLinkVaild: { code: 3005, message: '文章资源路径无效' },
  ArticleContentVaild: { code: 3006, message: '文章提正文不能为空' },
}

ApiErrorNames.getErrorInfo = (errorInfo) => {
  if (!errorInfo) {
    errorInfo = ApiErrorNames.UnknownError;
  }

  return errorInfo
}

export default ApiErrorNames