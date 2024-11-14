const { verifyAccessToken } = require("../helpers/JsonWebTokenHelper");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).send("missing token");
  }
  try {
    const bearer = token.split(" ");
    if (bearer[0] != "Bearer") {
      return res.status(400).send("missing bearer token")
    }
    await verifyAccessToken(bearer[1]).catch((err) => {
      return res.status(403).send("verify token fail");
    });
  } catch (error) {
    next(error);
  }
  next()
};
