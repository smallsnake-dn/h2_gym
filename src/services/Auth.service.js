const db = require("../providers/db");
const {
  genAccessToken,
  genRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/JsonWebTokenHelper");

class AuthService {
  async login(body) {
    const rs = await db.system_users.findFirst({
      where: {
        username: body.username,
      },
    });
    if (body.password == rs.password) {
      return {
        accessToken: await genAccessToken(body.username),
        refreshToken: await genRefreshToken(body.username),
      };
    }
    return null;
  }

  async refreshToken(token) {
    let username;
    await verifyRefreshToken(token.split(" ")[1])
      .catch((data) => {
        username = data
      })
      .catch((err) => {
        throw new Error("Verify token fail");
      });
    return genAccessToken(username);
  }
}

module.exports = new AuthService();
