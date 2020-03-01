const router = require('koa-router')()
const md5 = require('blueimp-md5')
const { UserModel, ChatModel } = require('../db/index')
const filter = { password: 0, __v: 0 } // 指定过滤的属性

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })


router.post('/register', async (ctx) => {
  console.log('请求参数', ctx.request.body)
  const { username, password, type } = ctx.request.body
  await UserModel.findOne({ username }, (err, user) => {
    console.log('查找错误', err)
    if (user) {
      ctx.body = {
        code: 1,
        msg: '此用户已存在'
      }
      return
    } else {
      let userInfo = new UserModel({ username, type, password: md5(password) })
      userInfo.save((err, user) => {
        console.log('插入用户信息', err, user)
        console.log('2')
        const data = { username, type, _id: user._id }
        ctx.cookies.set('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
        ctx.body = { code: 0, data }
        return
      })
    }
  })
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
      ctx.cookies.set('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
      ctx.body = {
        code: 0,
        data: user
      }
    }
  })
})

module.exports = router
