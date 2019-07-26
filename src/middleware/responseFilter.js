import ApiError from '../error/ApiError'
const responseFilter = () => {
  return async (ctx, next) => {

    try {
      await next()
      responseFormatter(ctx)
    } catch (error) {
      if (error instanceof ApiError) {
        ctx.status = 200;
        ctx.body = {
          code: error.code,
          message: error.message
        }
      } else {
        throw error;
      }
    }
  }
}

const responseFormatter = ctx => {
  if (ctx) {
    ctx.body = {
      code: 200,
      message: '',
      data: ctx.body
    }
  } else {
    ctx.body = {
      code: 200,
      message: ''
    }
  }
}

export default responseFilter