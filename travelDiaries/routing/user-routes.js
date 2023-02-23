const Router = require("express");
const allUsers  = require("../controllers/user-controller")

const useRouter = Router();

useRouter.get("/", allUsers.getAllUsers);
useRouter.post("/signup", allUsers.signup);
useRouter.post("/login", allUsers.login);

module.exports = useRouter;