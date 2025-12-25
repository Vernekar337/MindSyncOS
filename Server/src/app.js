const express = require('express');
const connectDB = require("../config/database")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")

const authRouter = require("../routers/auth");
const profileRouter = require("../routers/profile");


const PORT = 3001;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRouter);
app.use("/", userRouter);

connectDB().then(()=> {
  console.log("DB connected successfully")
  app.listen(PORT, ()=> {
  console.log("server started at http://localhost:3001")
});
})
.catch((err) => {
  console.error("DB did not connect")
});

