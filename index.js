const app = require('./express/app');
const sequelize = require('./sequelize');
const DB_Utils = require('./sequelize/DB_Utils');
const congressModel = require('./sequelize/Models/congressModel');
const port = process.env.PORT || 3001;

async function checkDBConnecitonOK() {
    console.log("checking db conneciton... ");
    try {
        await sequelize.authenticate();
        console.log("DB conneciton OK!");
    } catch (error) {
        console.log("Unable to connect to the db");
        console.error(error.message);
        process.exit(1);
    }
}

async function syncDB() {
    console.log("*****");
    console.log("Syncing DB...");

    // After initial run, remove the {force: true} from sequelize.sync(); No need to re-create tables every time server is run unless working on models

    await sequelize.sync({ force: true });
    console.log("DB sync complete");
    console.log("*******");
}

async function fillStatesTable() {
    console.log("Checking States Table...");
    try {
        const states = await sequelize.models.States.findAll();
        if (states.length === 0) {
            await DB_Utils.fillStates();
        } else {
            console.log("States Table filled");
        }
    } catch (error) {
        console.log("Error occurred while checking States table");
        console.error(error.message);
        process.exit(1);
    }

}

async function fillCongressTable() {
    console.log("Checking Congress Table...");
    try {
        const members = await sequelize.models.Congress.findAll();
        if (members.length === 0) {
            await DB_Utils.fillCongress();
        } else {
            console.log("Congress Table filled");
        }
    } catch (error) {
        console.log("Error occurred while checking Congress table");
        console.error(error.message);
        process.exit(1);
    }

}

async function init() {
    await checkDBConnecitonOK();

    await syncDB();

    await fillStatesTable();

    await fillCongressTable();

    app.listen(port, () => console.log(`Express Server w/ Sequelize DB conneciton started on port ${port}`));
}

init();