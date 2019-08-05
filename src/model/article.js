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
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, defaultSchemaExtend), defaultSchemaOptions)

const Article = mongoose.model('Article', ArticleSchema, 'Articles')

export default Article
