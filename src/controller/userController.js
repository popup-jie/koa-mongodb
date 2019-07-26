import uuid from 'uuid'
import utils from 'utility'
import User from '../model/user'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

const filter = { 'userPass': 0, '__v': 0 }

class UserController {
  static async getAllUser(ctx) {
    ctx.body = await User.find({}, filter)
  }

  // 用户登录
  static async loginUser(ctx) {
    let { userName, userPass } = ctx.query.body
    if (!userName) {
      throw new ApiError(ApiErrorNames.UserNameNotNull);
    }

    let hasUser = await User.findOne({ userName: userName });
    if (!hasUser) {
      throw new ApiError(ApiErrorNames.UserNotExist);
    }

    let log = await User.findOne({ userName: userName, userPass: userPass })
    if (!log) {
      throw new ApiError(ApiErrorNames.UserPassInvalid);
    }

    ctx.body = log

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

export default UserController
