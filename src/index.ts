import app from "./server";
import config from "@shared/config";

const port = config.port;

app.listen(port, () => {
  console.log("Express server started on port: " + port);
});
