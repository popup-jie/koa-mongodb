import ApiErrorNames from './ApiErrorNames'

function ApiError(name) {
  Error.call(this)
  let errorInfo = ApiErrorNames.getErrorInfo(name)
  this.code = errorInfo.code
  this.message = errorInfo.message
}

ApiError.prototype = Object.create(Error.prototype)

export default ApiError