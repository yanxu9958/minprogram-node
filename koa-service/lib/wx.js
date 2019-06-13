const request = require('request')
module.exports = {
  async getSession(code) {
    // const code = '021nt5Kw1P4qpg0eZ9Nw1xzMJw1nt5Kw'
    console.log('code-final', code)
    // code = '081br4mJ1YPy240jKTlJ14UNlJ1br4m1'
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxc61d58d3c32c497e&secret=03b5dc2d2275f95782c8efbffcdcd740&js_code=${code}&grant_type=authorization_code`
    return new Promise((resolve, reject) => {
      request(
        url,
        {
          method: 'GET',
          json: true
        },
        (error, res, body) => {
          if (error) {
            reject(error)
          } else {
            console.log('body-errcode', body)

            if (body.errcode) {
              reject(new Error(body.errmsg))
            } else {
              resolve(body)
            }
          }
        }
      )
    })
  }
}
