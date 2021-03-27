const BaseCommand = require('../../utils/structures/BaseCommand');
const mora = require('../../utils/bot/moraStorage');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('my-mora', 'mora', ['findmora', 'tm'])
    }

    async run(client, message, args) {

        const person = (typeof args[0] === 'undefined' || args[0] === null) ? null : await message.mentions[0].user;


        if (person === null) {
            await message.reply("Person doesn't exist!")
        } else {
            const mdata = mora.getUserMoraById(person.id);
            if (mdata === null) {
                await message.reply([
                    `They don't have mora!`
                ]);
            } else {
                await message.reply([
                    `That person (${person.username}) owns ${mdata}`,
                    {emote: "OrangeDogeHouse"},
                    `MORA!.`
                ]);
            }
        }

    }

}