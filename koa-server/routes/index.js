const router = require('koa-router')()
const md5 = require('blueimp-md5')
const { UserModel, ChatModel } = require('../db/index')
const filter = { password: 0, __v: 0 } // 指定过滤的属性

router.post('/register', async (ctx) => {
  console.log('请求参数', ctx.request.body)
  const { username, password, type } = ctx.request.body
  const userInfo = new UserModel({ username, type, password: md5(password) })
  const res = await userInfo.save()
  if (res) {
    console.log('0', res)
    ctx.cookies.set('userid', res._id, { maxAge: 1000 * 60 * 60 * 24 })
    ctx.body = {
      code: 0,
      data: {
        username,
        type,
        _id: res._id
      }
    }
  } else {
    console.log(1)
    ctx.body = {
      code: 1,
      msg: '注册失败'
    }
  }
})

router.post('/login', async (ctx) => {
  console.log('登录参数', ctx.request.body)
  const { username, password } = ctx.request.body
  await UserModel.findOne({ username, password: md5(password) }, filter, (err, user) => {
    if (!user) {
      ctx.body = {
        code: 1,
        msg: '用户名或密码错误'
      }
    } else {
      ctx.cookies.set('userid', user._id, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false
      })
      ctx.body = {
        code: 0,
        data: user
      }
    }
  })
})

router.post('/update', async (ctx) => {
  console.log('保存信息参数', ctx.request)
  const userid = ctx.cookies.get('userid')
  if (!userid) {
    ctx.body = {
      code: 1,
      msg: '请先登录'
    }
    return
  }
  const res = await UserModel.findByIdAndUpdate({ _id: userid }, ctx.request.body)
  if (res) {
    const { _id, username, type } = res
    const data = Object.assign(ctx.request.body, { _id, username, type })
    ctx.body = {
      code: 0,
      data
    }
  } else {
    ctx.body = {
      code: 2,
      msg: '用户信息保存失败'
    }
  }
})

router.get('/user', async (ctx) => {
  const userid = ctx.cookies.get('userid')
  if (!userid) {
    ctx.body = {
      code: 1,
      msg: '请先登录'
    }
    return
  }
  const res = await UserModel.findOne({ _id: userid }, filter)
  if (res) {
    ctx.body = {
      code: 0,
      data: res
    }
  } else {
    ctx.body = {
      code: 2,
      msg: '查询用户信息错误'
    }
  }
})

module.exports = router
