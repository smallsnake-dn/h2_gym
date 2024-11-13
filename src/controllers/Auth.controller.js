const {
  genAccessToken,
  verifyAccessToken,
  genRefreshToken,
  verifyRefreshToken,
} = require("../helpers/JsonWebTokenHelper");
const authService = require("../services/Auth.service")

class AuthController {
  async login(req, res, next) {
    try {
      if(!validateLogin(req.body)) {
        return res.status(400)
      }
      const token = await authService.login(req.body);
      if(!token) {
        return res.status(403).send("login failt")
      }
      res.send(token)
    } catch (error) {
      next(error)
    }
  }

  async refreshToken(req, res, next) {
    try {
      const rs = await authService.refreshToken(req.headers.authorization)
      res.send({
        accessToken : rs
      })
    } catch (err) {
      next(err);
    }
  }
}

const validateLogin = (body) => {
  if(!(body.username && body.password)) return false;
  return true;
}



module.exports = new AuthController();
