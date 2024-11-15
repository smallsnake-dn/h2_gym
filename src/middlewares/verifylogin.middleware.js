const { verifyAccessToken } = require("../helpers/JsonWebTokenHelper");
const ObjectResponse = require("../controllers/response/ObjectResponse")

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).send(ObjectResponse.error("missing token"));
  }
  try {
    const bearer = token.split(" ");
    if (bearer[0] != "Bearer") {
      return res.status(400).send(ObjectResponse.error("missing bearer token"))
    }
    await verifyAccessToken(bearer[1]).catch((err) => {
      return res.status(403).send(ObjectResponse.error("verify token fail"));
    });
  } catch (error) {
    next(error);
  }
};
