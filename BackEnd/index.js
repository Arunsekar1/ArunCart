const app = require('./app');
const path = require('path');
const connectDatabase = require('./config/database');

connectDatabase();

const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
    console.log(`server runnig to the port :${PORT} in ${process.env.NODE_ENV}`)
})

process.on('unhandledRejection', (err) => {
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to unhandled rejection');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException', (err) => {
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    server.close(()=>{
        process.exit(1);
    })
})
