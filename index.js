// require your server and start it
const server = require("./api/server");
require("dotenv").config();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}...`);
});
