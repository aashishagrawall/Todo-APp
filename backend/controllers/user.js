const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const dbConnection = require("../database");
const { body, validationResult } = require("express-validator");
// export const ddd=(req, res, next) => {
//   dbConnection
//     .execute("SELECT `name` FROM `users` WHERE `id`=?", [req.session.userID])
//     .then(([rows]) => {
//       res.render("home", {
//         name: rows[0].name,
//       });
//     });
// }); // END OF ROOT PAGE

// REGISTER PAGE

const register = async (req, res, next) => {
  const validation_result = validationResult(req);
  const { name, password, email } = req.body;
  // IF validation_result HAS NO ERROR
  if (validation_result.isEmpty()) {
    try {
      const hash_pass = await bcrypt.hash(password, 10);
      const id = uuidv4();
      if (hash_pass) {
        const token = jwt.sign({ id: id, email: email }, "jwtSecret");
        await dbConnection.execute(
          "INSERT INTO `users`(`id`,`name`,`email`,`password`,`token`) VALUES(?,?,?,?,?)",
          [id, name, email, hash_pass, token]
        );

        res.json({
          status: true,
          message: "Successfullt registered",
          token: token,
        });
      }

      // INSERTING USER INTO DATABASsE
    } catch (err) {
      res.json({ status: false, errors: [err.message] });
    }
  } else {
    // COLLECT ALL THE VALIDATION ERRORS
    let allErrors = validation_result.errors.map((error) => {
      return error.msg;
    });
    // REDERING login-register PAGE WITH VALIDATION ERRORS
    res.json({
      status: false,
      errors: allErrors,
    });
  }
};

const login = async (req, res) => {
  const validation_result = validationResult(req);
  const { password, email } = req.body;
  if (validation_result.isEmpty()) {
    try {
      const [
        rows,
      ] = await dbConnection.execute("SELECT * FROM `users` WHERE `email`=?", [
        email,
      ]);
      console.log(password, rows[0].password);
      const compareResult = await bcrypt.compare(password, rows[0].password);

      if (compareResult === true) {
        const token = jwt.sign({ id: rows[0].id, email: email }, "jwtSecret");

        await dbConnection.execute(
          "UPDATE `users` SET `token`=? where `id`=?",
          [token, rows[0].id]
        );

        res.json({
          status: true,
          message: "successfully loggedin",
          token: token,
        });
      } else {
        res.json({ status: false, errors: ["Invalid password"] });
      }

      // console.log(rows[0].password);
    } catch (err) {
      res.json({ status: false, errors: [err.message] });
    }
  } else {
    let allErrors = validation_result.errors.map((error) => {
      return error.msg;
    });
    // REDERING login-register PAGE WI

    res.json({
      status: false,
      errors: allErrors,
    });
  }
};

const updatePassword = async (req, res) => {
  const { password } = req.body;
  try {
    const hash_pass = await bcrypt.hash(password, 10);
    await dbConnection.execute("UPDATE `users` SET `password`=? where `id`=?", [
      hash_pass,
      req.user.id,
    ]);
    res.json({ status: true, message: "password successfully updated" });
  } catch (err) {
    res.json({ status: false, errors: [err.message] });
  }
};
module.exports = {
  login,
  register,
  updatePassword,
};
