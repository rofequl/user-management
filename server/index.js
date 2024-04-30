const express = require('express')
const app = express()
const sequelize = require('./app/models');
const port = 3030

// We provide a root route just as an example
app.get('/', (req, res) => {
    res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run migrate</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/users'>/api/users</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
		<p>To experiment with POST/PUT/DELETE requests, use a tool for creating HTTP requests such as <a href='https://github.com/jakubroztocil/httpie#readme'>HTTPie</a>, <a href='https://www.postman.com/downloads/'>Postman</a>, or even <a href='https://en.wikipedia.org/wiki/CURL'>the curl command</a>, or write some JS code for it with <a href='https://github.com/sindresorhus/got#readme'>got</a>, <a href='https://github.com/sindresorhus/ky#readme'>ky</a> or <a href='https://github.com/axios/axios#readme'>axios</a>.</p>
	`);
})

// Middleware function to introduce a delay for all routes
app.use((req, res, next) => {
    const delayMilliseconds = 500; // 2 seconds delay, adjust as needed
    setTimeout(next, delayMilliseconds);
});

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();
    require('./app/Kernel')(app)
    app.listen(port, () => {
        console.log(`Express server started on port ${port}. Try some routes, such as '/api/users'.`);
    });
}

init().then();