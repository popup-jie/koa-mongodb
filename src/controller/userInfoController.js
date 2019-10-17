import UserInfo from '../model/userinfo'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'
class UserInfoController {

  // 用户保存信息
  static async userSaveInfo(ctx) {
    let { infoid, nickName, avatar, area, sex, birthdate, sign } = ctx.request.body


    if (nickName === '') {
      throw new ApiError(ApiErrorNames.UserNickNameNotNull);
    } else if (avatar === '') {
      throw new ApiError(ApiErrorNames.UserAvatarNotNull);
    } else if (area === '') {
      throw new ApiError(ApiErrorNames.UserAreaNotNull);
    } else if (birthdate === '') {
      throw new ApiError(ApiErrorNames.UserBirthdateNotNull);
    }

    let doc = await UserInfo.updateOne({ '_id': infoid }, {
      $set: {
        nickName,
        avatar,
        area,
        sex,
        birthdate,
        sign: sign || ''
      }
    })

    ctx.body = doc

  }
}

export default UserInfoController