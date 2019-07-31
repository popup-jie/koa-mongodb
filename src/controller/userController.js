import Promise from 'bluebird'
import uuid from 'uuid'
import utils from 'utility'
import User from '../model/user'
import UserInfo from '../model/userinfo'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
import * as regex from '../config/regex'
import { secret } from '../config/index'
import * as jwt from 'jsonwebtoken'
const verify = Promise.promisify(jwt.verify)
const filter = { 'userPass': 0, '__v': 0, '_id': 0 }

class UserController {
  static async getAllUser(ctx) {
    ctx.body = await User.find({}, filter)
  }

  // 用户登录 账号密码登陆
  static async loginUser(ctx) {
    let { userName, userPass } = ctx.request.body
    if (!userName) {
      throw new ApiError(ApiErrorNames.UserNameNotNull);
    }
    if (!regex.emailCheck.test(userName)) {
      throw new ApiError(ApiErrorNames.UserEmailInvalid)
    }

    let hasUser = await User.findOne({ userName: userName });
    if (!hasUser) {
      throw new ApiError(ApiErrorNames.UserNotExist);
    }

    await login(ctx, userName, userPass)
  }

  // 用户登陆 token登陆
  static async userTokenLogin(ctx) {
    let token = ctx.request.headers['authorization']
    let payload = await verify(token, secret)
    let { userName, userPass } = payload
    ctx.body = login(ctx, userName, userPass)
  }


  static async getUserById(ctx) {
    let id = ctx.query.id;
    let user = await User.findOne({ id: id });
    if (user) {
      ctx.body = user;
    } else {
      throw new ApiError(ApiErrorNames.UserNotExist);
    }
  }


  // 用户注册
  static async saveUser(ctx) {
    let { userName, userPass } = ctx.request.body
    if (!userName) {
      throw new ApiError(ApiErrorNames.UserNameNotNull);
    }
    if (!regex.emailCheck.test(userName)) {
      throw new ApiError(ApiErrorNames.UserEmailInvalid)
    }

    if (userPass.length < 6) {
      throw new ApiError(ApiErrorNames.UserPassMinLength)
    }

    if (userPass.length > 12) {
      throw new ApiError(ApiErrorNames.UserPassMaxLength)
    }

    let selectuser = await User.findOne({ userName: userName })
    if (selectuser) {
      throw new ApiError(ApiErrorNames.UserIsExist);
    } else {
      let user = new User({
        userName: userName || admin,
        userPass: md5Pwd(userPass),
        userid: uuid.v1()
      });
      user = await user.save();
      ctx.body = user;
    }
  }

  static async removeUser(ctx) {
    User.remove({}, (e, d) => {
      ctx.body = {}
    })
  }
}

function md5Pwd(pwd) {
  const salt = 'gold_like_popup@mid!POS##'
  return utils.md5(utils.md5(pwd + salt))
}

async function login(ctx, userName, userPass) {
  let log = await User.findOne({ userName: userName, userPass: md5Pwd(userPass) }, filter)
  if (!log) {
    throw new ApiError(ApiErrorNames.UserPassInvalid);
  }
  let payload = { userName: userName, time: new Date().getTime(), timeout: 10000, userPass: userPass }
  let token = jwt.sign(payload, secret);
  return ctx.body = {
    userInfo: log,
    token: token
  }
}


export default UserController
