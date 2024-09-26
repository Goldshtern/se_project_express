const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  NONEXISTENT_ERROR_CODE,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find()
    .then((clothingItems) => res.send({ clothingItems }))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        const error = new Error();
        error.name = "ForbiddenError";
        throw error;
      }
      return item
        .deleteOne()
        .then((deletedItem) => res.status(201).send(deletedItem));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      if (err.name === "ForbiddenError") {
        return res
          .status(FORBIDDEN_ERROR_CODE)
          .send({ message: "Access forbidden" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NONEXISTENT_ERROR_CODE)
          .send({ message: "Requested resource not found" });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { getItems, createItem, deleteItem };
