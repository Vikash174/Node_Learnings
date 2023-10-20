const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  //   fs.readFile("03_how_node_works/text-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // Using Streams

  /*  const readable = fs.createReadStream(
    "03_how_node_orks/text-file.txt",
    "utf8"
  );

  readable.on("data", (chunk) => {
    res.write(chunk);
  });

  readable.on("end", () => {
    res.end();
  });

  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found");
  }); */

  const readable = fs.createReadStream("03_how_node_works/text-file.txt");
  readable.pipe(res);
});

server.listen(8100, "127.0.0.1", () => {
  console.log("Server started");
});
