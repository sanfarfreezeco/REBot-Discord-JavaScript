const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");

module.exports = async (client) => {
    const Table = new ascii("Commands Loaded");

    CommandsArray = [];

    (await PG(`${process.cwd()}/commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "Failed", "Missing Name")

        if(!command.description)
        return Table.addRow(command.name, "Failed", "Missing Desc")

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "SUCCESS");
    });

    console.log(Table.toString());
}