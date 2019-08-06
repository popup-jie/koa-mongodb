const emailCheck = /^[0-9a-zA-Z]+(?:[_-][a-z0-9-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*.[a-zA-Z]+$/i

const ImgCheck = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/

const urlCheck = /^http(s)?:\/\/.+\..+/i

export default {
  emailCheck,
  ImgCheck,
  urlCheck
}