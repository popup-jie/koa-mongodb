import * as path from 'path'
import { QINIU } from '../config/index'
import { uploadFile, untoQiniu, removeTemFile } from './uploadFile.js'
class File {
  static async upload(ctx) {
    const serverPath = path.join(__dirname, '../uploadtemp/')

    const result = await uploadFile(ctx, {
      fileType: 'poster',
      path: serverPath
    })
    const imgPath = path.join(serverPath, result.imgPath)

    await untoQiniu(imgPath, result.imgKey)

    removeTemFile(imgPath)
    ctx.body = { imgPath: QINIU.origin + '/' + result.imgKey }
  }
}


export default File