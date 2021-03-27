const BaseCommand = require('../../utils/structures/BaseCommand');
const mora = require('../../utils/bot/moraStorage');
const payws = require('../../express/app');

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('my-mora', 'mora', ['pay'])
    }

    async run(client, message, args) {

        const person = (typeof args[0] === 'undefined' || args[0] === null) ? null : await message.mentions[0].user;
        const amount = (typeof args[1] === 'undefined' || args[1] === null) ? null : parseInt(args[1]);

        if (person === null) {
            await message.reply("Person doesn't exist!");
        } else {
            if (amount === null) {
                await message.reply("Amount is invalid!");
            } else {
                if (mora.getUserMora(message.author) < amount) {
                    await message.reply([`Not enough`, {"emote": "OrangeDogeHouse"}, 'MORA']);
                } else {
                    mora.updateMora(message.author, mora.getUserMora(message.author) - amount);
                    mora.updateMora(person, amount);
                    payws.wsBroadcast({
                        intent: "PAYMENT",
                        currency: {
                            ticker: "MORA",
                            color: "gold"
                        },
                        data: {
                            amount: amount,
                            receiver: {
                                id: person.id,
                                username: person.username
                            },
                            sender: {
                                id: message.author.id,
                                username: message.author.username
                            },
                            timestamp: new Date()
                        }
                    });
                    await message.reply([`You've paid ${person.username} ${amount}`, {"emote": "OrangeDogeHouse"}, 'MORA']);
                }
            }
        }

    }

}