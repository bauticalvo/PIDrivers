const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const {getTeams} = require('./src/controllers/teamsController.js')
const PORT = 3001;

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`________Server listening on port ${PORT}________`);
})
}).catch(error => console.error(error))
