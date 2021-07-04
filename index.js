const express = require('express');
const app = express();
const port = 3006;
const db = require('./db.js');
const router = require('./router');
const cors = require('cors')

//Middleware
app.use(cors())
app.use(express.json());
app.use(router);

db
.then(()=>{

    app.listen(port, () => console.log(`Node server running on https://git.heroku.com/afp-popstv-b.git`));
})
.catch((err)=> console.log(err.message));
