const dbConnection = require("../database");
const addItem = async (req, res) => {
  const { id, title, status } = req.body;
  try {
    await dbConnection.execute(
      "INSERT INTO `todo`(`id`,`title`,`status`,`userId`) VALUES(?,?,?,?)",
      [id, title, status, req.user.id]
    );
    console.log([id, title, status, req.user.id]);
    res.json({
      status: true,
      message: "Successfully added",
    });
  } catch (err) {
    res.json({ status: false, errors: [err.message] });
  }
};
const updateItem = async (req, res) => {
  const { title, status } = req.body;
  const { id } = req.params;
  try {
    await dbConnection.execute(
      "UPDATE `todo` SET `title`=?,`status`=? where `id`=?",
      [title, status, id]
    );

    res.json({
      status: true,
      message: "Successfully updated",
    });
  } catch (err) {
    res.json({ status: false, errors: [err.message] });
  }
};
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    await dbConnection.execute("DELETE FROM `todo` WHERE `id`=?;", [id]);

    res.json({
      status: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.json({ status: false, errors: [err.message] });
  }
};
const listItems = async (req, res) => {
  try {
    const [
      rows,
      fields,
    ] = await dbConnection.execute(
      "SELECT `id`,`title`,`status` FROM `todo` where `userId`=?",
      [req.user.id]
    );
    console.log(rows);
    res.json({
      status: true,
      items: rows,
    });
  } catch (err) {
    res.json({ status: false, errors: [err.message] });
  }
};

module.exports = {
  addItem,
  deleteItem,
  updateItem,
  listItems,
};
