const PostModel = require("../model/postModel")

const createPost = async (req, res) => {
    try {
        const postData = await PostModel.create(req.body);
        res.json({
            success: true,
            message: "post created successfully",
            dataId: postData._id,
        });
    }
    catch {
        res.json({
            success: false,
            message: "something went wrong",
        });
    }
}

const listPost = async (req, res) => {
    try {
        const allPost = await PostModel.find();
        if (!allPost || allPost.length === 0) {
            return res.status(404).json({
                message: "No post found"
            });
        }
        res.json({
            success: true,
            message: "All post found successfully",
            data: allPost,
        });
    } catch {
        res.json({
            success: false,
            message: "Internal server error",
        });
    }
};

const singlePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                message: "No post found"
            });
        }
        res.json({
            success: true,
            message: "Post found successfully",
            data: post,
        });
    } catch {
        res.json({
            success: false,
            message: "Internal server error",
        });
    }
};

const editPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatPost = await PostModel.findByIdAndUpdate(postId, {
            $set: req.body,
        });
        if (!updatPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json({
            success: true,
            message: "Post updated successfully",
        });
    } catch {
        res.json({
            success: false,
            message: "Internal server error",
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const deletePost = await PostModel.findByIdAndDelete(postId);
        if (!deletePost) {
            return res.status(404).json({
                success: false, message: "Post not found"
            });
        }
        res.json({
            success: true,
            message: "post deleted successfully",
        });
    } catch {
        res.json({
            success: false,
            message: "Internal server error",
        });
    }
};


const postController = {
    createPost,
    listPost,
    singlePost,
    editPost,
    deletePost,
}

module.exports = postController;