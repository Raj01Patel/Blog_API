const PostModel = require("../model/postModel")

const createComment = async (req, res) => {
    try {
        const commentData = {
            userID: req.user._id,
            comment: req.body.comment,
        };

        const comments = await PostModel.findByIdAndUpdate(req.body.postId, {
            $push: { comment: commentData },
        });

        if (!comments) {
            return res.json({
                success: false,
                message: "Post not found",
            });
        }
        res.json({
            success: true,
            message: "Comment added successfully",
        });
    }
    catch (err) {
        res.json({
            status: false,
            message: "Comment not created",
        });
    }
}

const updateComment = async (req, res) => {
    try {
        const post = await PostModel.updateOne(
            { _id: req.body.postId, "comments._id": req.body.commentId },
            {
                $set: {
                    "comments.$.comment": req.body.comment,
                }
            });
        if (!post) {
            return res.json({
                success: false,
                message: "Post not found",
            });
        }

        res.json({
            status: true,
            message: "Comment update successfully",
            data: post,
        });

    } catch (err) {
        res.json({
            status: false,
            message: "Comment not update",
            data: err,
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const removeComment = await PostModel.findByIdAndUpdate(req.body.postId, {
            $pull: { comments: { _id: req.body.commentId } },
        }, { new: true });
        if (!removeComment) {
            return res.status(400).json({ message: "Post or comment not found" });
        }
        res.json({
            status: true,
            message: "Comment deleted successfully",
        });
    } catch (err) {
        res.json({
            status: false,
            message: "Comment not deleted",
            error: err.message,
        });
    }
};

const commentController = {
    createComment,
    updateComment,
    deleteComment,
};
module.exports = commentController;
