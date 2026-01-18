const http = require("http");
const app = require("./app"); 
const { initializeSocket } = require("./socket"); // adjust path if needed

const server = http.createServer(app);

// Initialize socket.io
initializeSocket(server);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
