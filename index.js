const server = require('./api/server.js');


const port = 5000;
server.listen(port, () => {
    console.log(`\n** The server is creepin' up on http://localhost:${port} **\n`)
})
