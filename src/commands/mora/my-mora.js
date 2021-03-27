const BaseCommand = require('../../utils/structures/BaseCommand');
const mora = require('../../utils/bot/moraStorage');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('my-mora', 'mora', ['mm', 'mymora'])
    }

    async run(client, message, args) {

        const author = message.author;
        let mdata = mora.getUserMora(author);

        if(mdata === null){
            await message.reply("You don't have mora! use v!getmora to get your mora!")
        }else{
            await message.reply([
                `You have ${mdata}`,
                {emote: "OrangeDogeHouse"},
                `MORA! Keep mining using v!getmora.`
            ]);
        }

    }

}