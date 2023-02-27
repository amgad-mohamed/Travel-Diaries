const Router = require("express");
const allPosts = require("../controllers/post-controller");

const postRouter = Router();

postRouter.get("/", allPosts.geAllPosts);
postRouter.get("/:id", allPosts.getPostById );
postRouter.post("/", allPosts.addPost);
postRouter.put("/:id", allPosts.updatePost);
postRouter.delete("/:id", allPosts.deletePost);

module.exports = postRouter;
