const ClothingItem = require("../models/clothingItem");

//const {
//BAD_REQUEST_ERROR_CODE,
//FORBIDDEN_ERROR_CODE,
//DEFAULT_ERROR_CODE,
//NONEXISTENT_ERROR_CODE,
//} = require("../utils/errors");

const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

const getItems = (req, res, next) => {
  ClothingItem.find()
    .then((clothingItems) => res.send({ clothingItems }))
    .catch((err) => {
      next(err);
    });
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Requested resource not found");
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Access forbidden");
      }
      return item
        .deleteOne()
        .then((deletedItem) => res.status(200).send(deletedItem));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = { getItems, createItem, deleteItem };
