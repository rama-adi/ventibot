const BaseCommand = require('../../utils/structures/BaseCommand');
module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('my-mora', 'mora', ['help', '?'])
    }

    async run(client, message, args) {
        await message.reply([
            {"emote": "OrangeDogeHouse"},
            'Command list: https://onebyte.gitbook.io/dogeventi/ventibot-dogehouse/commands'
        ]);
    }

}