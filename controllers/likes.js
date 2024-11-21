const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Requested resource not found");
    })
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Requested resource not found");
    })
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};
