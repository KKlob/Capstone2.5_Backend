const app = require('./express/app');
const sequelize = require('./sequelize');
const DB_Utils = require('./sequelize/DB_Utils');
const port = process.env.PORT || 3001;

async function checkDBConnecitonOK() {
    console.log("checking db conneciton... ");
    try {
        await sequelize.authenticate();
        console.log("DB conneciton OK!");
    } catch (error) {
        console.log("Unable to connect to the db");
        console.log(error.message);
        process.exit(1);
    }
}

async function fillStatesTable() {
    console.log("Checking States Table...");
    const states = await sequelize.models.States.findAll();
    if (states.length === 0) {
        await DB_Utils.fillStates();
    } else {
        console.log("States Table filled");
    }
}

async function fillCongressTable() {
    console.log("Checking Congress Table...");
    const members = await sequelize.models.Congress.findAll();
    if (members.length === 0) {
        await DB_Utils.fillCongress();
    } else {
        console.log("Congress Table filled");
    }
}

async function init() {
    await checkDBConnecitonOK();
    console.log("*****");
    console.log("Syncing DB...");
    await sequelize.sync();
    console.log("DB sync complete");
    console.log("*******");

    await fillStatesTable();

    app.listen(port, () => console.log(`Express Server w/ Sequelize DB conneciton started on port ${port}`));
}

init();