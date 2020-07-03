const { Router } = require("express");
const usercontroller = require("../controllers/user");
const todocontroller = require("../controllers/todo");
const authenticate = require("../middleware/middleware");
const dbConnection = require("../database");

const { body, validationResult } = require("express-validator");
const router = new Router();

router.post(
  "/register",
  [
    body("email", "Invalid email address!")
      .isEmail()
      .custom((value) => {
        return dbConnection
          .execute("SELECT `email` FROM `users` WHERE `email`=?", [value])
          .then(([rows]) => {
            if (rows.length > 0) {
              return Promise.reject("This E-mail already in use!");
            }
            return true;
          });
      }),
    body("name", "Username is Empty!").trim().not().isEmpty(),
    body("password", "The password must be of minimum length 6 characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  usercontroller.register
);

router.post(
  "/login",
  [
    body("email").custom((value) => {
      return dbConnection
        .execute("SELECT `email` FROM `users` WHERE `email`=?", [value])
        .then(([rows]) => {
          if (rows.length == 1) {
            return true;
          }
          return Promise.reject("Email ID or password doesnot exist");
        });
    }),
    body("password", "Password is empty!").trim().not().isEmpty(),
  ],
  usercontroller.login
);

router.post("/todos", authenticate, todocontroller.addItem);
router.put("/todos/:id", authenticate, todocontroller.updateItem);
router.delete("/todos/:id", authenticate, todocontroller.deleteItem);
router.get("/todos", authenticate, todocontroller.listItems);
router.put("/updatePassword", authenticate, usercontroller.updatePassword);

module.exports = router;
