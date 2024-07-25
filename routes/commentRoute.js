const express = require("express")
const commentController = require("../controller/commentController")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()

router.post("/create", authMiddleware, commentController.createComment)

router.post("/update", authMiddleware, commentController.updateComment)

router.post("/delete", authMiddleware, commentController.deleteComment)

module.exports = router