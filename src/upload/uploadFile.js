import Busboy from 'Busboy'
import qiniu from 'qiniu'
import * as fs from 'fs'
import * as path from 'path'
import { QINIU } from '../config/index'

const mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
  return false
}

function getSuffix(fileName) {
  return fileName.split('.').pop()
}

function reName(fileName) {
  return Math.random().toString(32).substr(4) + '.' + getSuffix(fileName)
}

export const removeTemFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err
  })
}

export const uploadFile = (ctx, option) => {
  const busboy = new Busboy({ headers: ctx.req.headers })

  const fileType = option.fileType || 'image'
  const filePath = path.join(option.path, fileType)

  const mkdirResult = mkdirsSync(filePath)

  console.log(`filePath:` + mkdirResult)

  if (!mkdirResult) return

  return new Promise((resolve, reject) => {
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

      const fileName = reName(filename)
      const saveTo = path.join(path.join(filePath, fileName))

      file.pipe(fs.createWriteStream(saveTo))

      file.on('end', () => {
        resolve({
          imgPath: `/${fileType}/${fileName}`,
          imgKey: fileName
        })
      })
    })

    busboy.on('finish', () => { })

    busboy.on('error', (err) => {
      reject(err)
    })

    ctx.req.pipe(busboy)
  })
}

export const untoQiniu = (filePath, key) => {
  const accessKey = QINIU.accessKey
  const secretKey = QINIU.secretKey
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

  const options = {
    scope: QINIU.bucket
  }

  const putPolicy = new qiniu.rs.PutPolicy(options)

  const uploadToken = putPolicy.uploadToken(mac)

  const config = new qiniu.conf.Config()

  config.zone = qiniu.zone.Zone_z2

  const localFile = filePath

  const formUploader = new qiniu.form_up.FormUploader(config)

  const putExtra = new qiniu.form_up.PutExtra()

  return new Promise((resolved, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      } else {
        resolved(respBody)
      }
    })
  })
}