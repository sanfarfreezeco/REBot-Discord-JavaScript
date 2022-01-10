const { Events } = require("../validation/event_val");
const { promisify } = require("util");
const { glob } = require("glob");
const ascii = require('ascii-table')
const PG = promisify(glob);

module.exports = async (client) => {
    const Table = new ascii("Event Handler");

    (await PG(`${process.cwd()}/events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, `MISSING: ${L[6] + `/` + L[7]}`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "LOADED")
    });

    console.log(Table.toString());
}