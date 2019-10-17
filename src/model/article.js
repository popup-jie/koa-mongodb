import mongoose from '../dbHelper'
import { defaultSchemaExtend, defaultSchemaOptions } from '../config/index'

const Schema = mongoose.Schema

const ArticleSchema = new Schema(Object.assign({
  coverImg: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  subarea: {
    type: String,
    required: true
  },
  resourceLink: {
    type: String,
    default: ''
  },
  zipCode: {
    type: String,
    default: ''
  },
  content: {
    type: String
  },
  userid: { // 绑定user表 _id 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isEditLabel: { // 标签栏是否允许编辑
    type: Boolean,
    default: false
  },
  lookCount: { // 查看次数
    type: Number,
    default: 0
  },
  discount: { //  评论数
    type: Number,
    default: 0
  },
  collect: { //  收藏数
    type: Number,
    default: 0
  },
  zanCount: { //  点赞数
    type: Number,
    default: 0
  },
  subarea: { // 生活0 资源1
    type: Number,
    default: 0
  },
  status: { // 0 未审核 1 审核通过 2审核不通过 3是通过
    type: Number,
    default: 0
  }
}, defaultSchemaExtend), defaultSchemaOptions)

const Article = mongoose.model('Article', ArticleSchema, 'Articles')

export default Article
