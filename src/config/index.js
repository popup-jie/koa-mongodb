export const DB_URL = 'mongodb://localhost:27017/nicezan'

export const defaultSchemaExtend = {
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}

export const defaultSchemaOptions = {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
};

export const secret = 'mytoken'

export const QINIU = {
	accessKey: 'jk2KAVWcggFHgCKYnNZDGPJI9X6cGsts6S0YUNQQ',
	secretKey: 'vAUvjRW4aQVUssDazPIvPJEgnd-cRbplHUiD3yVK',
	bucket: 'nicezandb-coverimg',
	origin: 'http://pvr1pmrm2.bkt.clouddn.com',
	uploadURL: ''
}