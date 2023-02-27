const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const useRouter = require("./routing/user-routes");
const postRouter = require("./routing/post-routes");

const app = express();


app.use(express.json())
app.use("/user", useRouter);
app.use("/posts", postRouter)
dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL || connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => console.log("listening at port 5000"));
  })
  .catch((err) => console.log(err));
