const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", auth, validateClothingItem, createItem);
router.delete("/:itemId", auth, validateId, deleteItem);

module.exports = router;
