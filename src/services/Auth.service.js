const db = require("../providers/db");
const {
  genAccessToken,
  genRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../helpers/JsonWebTokenHelper");
const ImageKit = require('imagekit');
const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/hdtdev/",
  publicKey: "public_VcHSOh0fSIyAEW7itJqlKpNSLmA=",
  privateKey: "private_qkPQ1GBII4FWXfPwpO+V8km/Jis="
});

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
      .then(data => {
        username = data.data;
      })
      .catch((err) => {
        throw new Error("Verify token fail");
      });
      console.log({token});
    return {
      accessToken : await genAccessToken(username)
    }
  }


  async changePassword(token, body) {
    const [username, password, newpassword] = body
    await verifyRefreshToken(token.split(" ")[1])
      .then ((data) => {
        // username = data.data
      })
      .catch((err) => {
        throw new Error("Verify token fail");
      });
    const rs = await db.system_users.findFirst({
      where: {
        username: body.username,
      },
    });
    if(password != rs.password) {
      throw new Error("wrong password")
    }
    await db.system_users.update({
      data : {
        password : newpassword
      }, where : {
        username
      }
    })
    return genAccessToken(username);
  }

  async imageKitAuth() {
    var rs = imagekit.getAuthenticationParameters();
    return rs;
  }

}

module.exports = new AuthService();
