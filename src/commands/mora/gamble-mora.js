const BaseCommand = require('../../utils/structures/BaseCommand');
const mora = require('../../utils/bot/moraStorage');
const payws = require('../../express/app');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('gamble-mora', 'mora', ['gamblemora', 'gamble'])
    }

    async run(client, message, args) {
        if (typeof args[0] === "undefined" || args[0] === '' || args[0] === null || args[0] === 0) await message.reply(["Please specify the amount of ", {emote: "OrangeDogeHouse"}, " MORA to gamble!"])
        const author = message.author;
        const amount = parseInt(args[0]);
        let mdata = mora.getUserMora(author);

        if (mdata < amount || mdata === 0 || mdata === null) {
            await message.reply(["Not enough", {"emote": "OrangeDogeHouse"}, "MORA to gamble!"], {whispered: true})
        } else {
            mora.setMora(author, (mdata - amount));
            const flipped = this.flipCoin();
            if (flipped === "W") {
                mora.setMora(author, mdata - amount);
                await message.reply([`You've lost ${amount}`, {"emote": "OrangeDogeHouse"}, "MORA to gamble!"], {whispered: true});
                payws.wsBroadcast({
                    intent: "GAMBLE",
                    currency: "MORA",
                    data: {
                        amount: amount,
                        win: false,
                        timestamp: new Date()
                    }
                });
            } else {
                mora.setMora(author, (mdata + (amount * 2)));
                payws.wsBroadcast({
                    intent: "GAMBLE",
                    currency: "MORA",
                    data: {
                        amount: amount,
                        win: true,
                        timestamp: new Date()
                    }
                });
                await message.reply([`You've won ${amount * 2}`, {"emote": "OrangeDogeHouse"}, "MORA from gambling!"]);
            }
        }
    }

    flipCoin() {

        return (Math.random() > 0.8) ? "W" : "L";
    }
}