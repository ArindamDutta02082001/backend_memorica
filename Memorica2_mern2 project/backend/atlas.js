const mongoose = require("mongoose");

const url =
  "mongodb+srv://Arindam:Arindam@123@cluster0.aazgw.mongodb.net/Memorica?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((ok) => {
    console.log("Connected to Atlas");
  })
  .catch((e) => {
    console.log("Not Connected to Atlas");
  });
