import mongoose from '../dbHelper'
import { defaultSchemaExtend, defaultSchemaOptions } from '../config/index'

const Schema = mongoose.Schema

const UserSchema = new Schema(Object.assign({
  userName: {
    type: String,
    required: true
  },
  userPass: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  },
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo'
  }
}, defaultSchemaExtend), defaultSchemaOptions)

const User = mongoose.model('User', UserSchema, 'Users')

export default User