require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const gunsRouter = require("./routes/guns");
const gunRouter = require("./routes/gun");

app.use(cors());
app.use(express.json());
//app.use(express.static(path.resolve(__dirname, "../front-end/build")));

app.use("/api/guns", gunsRouter);
app.use("/api/gun", gunRouter);

const port = process.env.PORT || 3005;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
