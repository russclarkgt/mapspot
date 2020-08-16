const express = require("express");
const application = express();

// external routing
const pageRoutes = require("./routes/pages");
const apiRoutes = require("./routes/api");

application.use("/", pageRoutes);
application.use("/api", apiRoutes);

// other middlewares
application.use(express.static("public"));
application.use(express.urlencoded({ extended: true }));
application.use(express.json());

application.listen(8081);
