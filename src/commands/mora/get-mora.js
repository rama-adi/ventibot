const BaseCommand = require('../../utils/structures/BaseCommand');
const recents = new Set();
const mora = require('../../utils/bot/moraStorage');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('get-mora', 'mora', ['gm', 'getmora'])
    }

    async run(client, message, args) {
        let randomMora = this.generateRandomMora();
        const author = message.author;

        if (recents.has(author.id)) {
            await message.reply(["there's a 20 second delay when claiming ", {emote: "OrangeDogeHouse"}, " MORA. please wait a bit."], {whispered: true});
        } else {
            recents.add(author.id);
            mora.updateMora(author, randomMora);
            this.addDelay(author.id);
            await message.reply([
                {emote: "OrangeDogeHouse"},
                `You've mined ${randomMora} MORA!. you can mine again in 20 seconds.`,
                `Your current mora: ${mora.getUserMora(author) ?? 0}`
            ]);


        }

    }

    generateRandomMora() {
        let mx = Math.floor(Math.random() * 11);
        if (mx < 1) {
            mx = 1;
        }
        return mx;
    }

    addDelay(authorId){
        setTimeout(() => {
            recents.delete(authorId);
        }, 20000);
    }
}