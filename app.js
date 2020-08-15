const express = require("express");
const application = express();

// express routing
application.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// other middlewares
application.use(express.static("public"));
application.use(express.urlencoded({ extended: true }));
application.use(express.json());

application.listen(8081);
