import express from "express";
import * as dotenv from "dotenv";
import { connect } from "./config/db.config.js";
import { userRouter } from "./routes/user.routes.js";
import { forumRouter } from "./routes/forum.routes.js";
import { commentRouter } from "./routes/comment.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { orderRouter } from "./routes/order.routes.js";
import cors from "cors";

dotenv.config();
connect();

const app = express();

app.use(cors());
app.use(express.json());

const API_VERSION = "1.0";

app.use(`/api/${API_VERSION}/user`, userRouter);
app.use(`/api/${API_VERSION}/forum`, forumRouter);
app.use(`/api/${API_VERSION}/comment`, commentRouter);

app.use(`/api/${API_VERSION}/cart`, cartRouter);
app.use(`/api/${API_VERSION}/order`, orderRouter);

app.use(`/api/${API_VERSION}/tea`, userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
