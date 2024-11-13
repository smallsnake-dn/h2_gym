const ObjectResponse = require("../controllers/response/ObjectResponse")


module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).send(ObjectResponse.error("missing token"));
  }
  next()
};
