import express from "express";
import * as dotenv from "dotenv";
import { connect } from "./config/db.config.js";
import { userRouter } from "./routes/user.routes.js";
import { forumPostRouter } from "./routes/forumPost.routes.js";
import { forumProfileRouter } from "./routes/forumProfile.routes.js";
import { forumCommentRouter } from "./routes/forumComment.routes.js";
import { reviewRouter } from "./routes/review.routes.js";
import { teaRouter } from "./routes/tea.routes.js";
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

app.use(`/api/${API_VERSION}/tea-room/post`, forumPostRouter);
app.use(`/api/${API_VERSION}/tea-room/profile`, forumProfileRouter);
app.use(`/api/${API_VERSION}/tea-room/comment`, forumCommentRouter);

app.use(`/api/${API_VERSION}/cart`, cartRouter);
app.use(`/api/${API_VERSION}/order`, orderRouter);

app.use(`/api/${API_VERSION}/tea`, teaRouter);
app.use(`/api/${API_VERSION}/review`, reviewRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
