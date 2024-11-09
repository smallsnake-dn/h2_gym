const { verifyAccessToken } = require("../helpers/JsonWebTokenHelper");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).send("missing token");
  }
  try {
    await verifyAccessToken(token.split(" ")[1]).catch((err) => {
      return res.status(403).send("verify token fail");
    });
  } catch (error) {
    next(error);
  }
  next()
};
