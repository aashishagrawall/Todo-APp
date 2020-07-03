const jwt = require("jsonwebtoken");
const dbConnection = require("../database");
const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(200).json({
      status: false,
      errors: ["Send authorization heder"],
    });
  }
  const token = authorization.split(" ")[1];
  try {
    var decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded;
    const [
      rows,
    ] = await dbConnection.execute("SELECT `token` FROM `users` WHERE `id`=?", [
      req.user.id,
    ]);
    if (rows[0].token !== token) {
      return res.status(200).json({
        status: false,
        errors: ["you have been logged out"],
      });
    }

    console.log(token, req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: false,
      errors: ["Not authorized"],
    });
  }
};

module.exports = validateToken;
