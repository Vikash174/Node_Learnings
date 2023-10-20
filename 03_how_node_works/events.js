const Emitter = require("events");
const http = require("http");

// const myEmitter = new Emitter();

class Sales extends Emitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There is a new sale");
});

myEmitter.on("newSale", () => {
  console.log("something new");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are ${stock} items left`);
});

myEmitter.emit("newSale", 2);

/*---------------------------------------- */

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request recived");
});

server.on("request", (req, res) => {
  console.log("2nd request");
});

server.on("close", () => {
  console.log("Server closed");
});

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Server started");
// });
