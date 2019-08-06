import Promise from 'bluebird'
import * as jwt from 'jsonwebtoken'
import { secret } from '../config/index'
const verify = Promise.promisify(jwt.verify)

class JsonToken {
  setUserToken(userName, userid) {
    let payload = { userName: userName, time: new Date().getTime(), timeout: 3600 * 60 * 4 * 1000, userid: userid }
    let token = jwt.sign(payload, secret);
    return token
  }

  async getUserToken(ctx) {
    let token = ctx.request.headers['authorization']
    let payload = await verify(token, secret)
    return payload
  }
}

export default new JsonToken()