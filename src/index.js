require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');


const server = createServer();


// TODO Use express with jwt and cookies
server.express.use((req, res, next) => {
  req.userId = 'cjq2uao9n0xph0a98v7cvg6i2';
  next();
});


// 2. Create a middleware that populates the user on each request

server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, currentStudyingDay, email, name }'
  );
  req.user = user;
  next();
});

const { addNewCards } = require('./jobs');
addNewCards()


server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, deets => {
  console.log(`Server running on port 
  http://localhost:${deets.port}`);
})