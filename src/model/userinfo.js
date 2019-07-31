import mongoose from '../dbHelper'
import { defaultSchemaExtend, defaultSchemaOptions } from '../config/index'

const Schema = mongoose.Schema

const UserInfoSchema = new Schema(Object.assign({
  Userid: {
    type: String,
    required: true
  },
  NickName: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  area: {
    type: String
  },
  sex: {
    type: Boolean
  },
  birthdate: {
    type: String
  },
  sign: {
    type: String
  }

}, defaultSchemaExtend), defaultSchemaOptions)

const UserInfo = mongoose.model('UserInfo', UserInfoSchema, 'UserInfos')

export default UserInfo