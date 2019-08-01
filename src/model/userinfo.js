import mongoose from '../dbHelper'
import { defaultSchemaExtend, defaultSchemaOptions } from '../config/index'

const Schema = mongoose.Schema

const UserInfoSchema = new Schema(Object.assign({
  NickName: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  area: {
    type: String,
    default: ''
  },
  sex: {
    type: Boolean,
    default: 0
  },
  birthdate: {
    type: String,
    default: ''
  },
  sign: {
    type: String,
    default: ''
  },
  lemonCount: {
    type: Number,
    default: 0
  }

}, defaultSchemaExtend), defaultSchemaOptions)

const UserInfo = mongoose.model('UserInfo', UserInfoSchema, 'UserInfos')

export default UserInfo