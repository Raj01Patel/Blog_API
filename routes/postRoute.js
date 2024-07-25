const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/",authMiddleware,postController.listPost)

router.post("/create", authMiddleware, postController.createPost)

router.get("/getpost/:postId",authMiddleware,postController.singlePost)

router.put("/edit/:postId",authMiddleware,postController.editPost)

router.delete("/delete/:postId",authMiddleware,postController.deletePost)

module.exports = router