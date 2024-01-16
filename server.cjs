// npm i cors

// bring in all dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// define variables
const PORT = process.env.PORT || 3001;

// Connect to the database
require('./config/database.cjs');

// create my app
const app = express();

// cross origin resource sharing
app.use(require('cors')())
app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon and static middlewares
// to serve from the production build folder
// in our case, the folder is called 'dist' because that is
// what vite names it when we run the build script

// == note == we may not use this, so I'm commenting it out for now
// and I'll uncomment when we use it
// ==
// app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken.cjs'));

// Put API routes here, before the "catch all" routes
app.get('/api/test', (req, res) => {
    res.send('You just hit a API route');
  });

app.use('/api/users', require('./routes/api/users.cjs'));
// we have included the line 
// const userRouter = require('./routes/api/users.cjs')
// app.use('/api/user', userRouter);

// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn.cjs');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items.cjs'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders.cjs'));

// The following "catch all" route (note the /*) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));

});


app.listen(PORT, function () {
    console.log(`Express app running on port: ${PORT}`);
})