import Bun from 'bun'

const server = Bun.serve({
  port: process.env.PORT,
  fetch(request) {
    return new Response("Welcome to Bun!");
  },
});

console.log(`Listening on localhost:${server.port}`);