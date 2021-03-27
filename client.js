const config = require('./config.json');
const {Client} = require('dogehouse.js');
const joinroom = require('./src/events/joinroom.js')
const {registerCommands, registerEvents} = require('./src/utils/registry')
const ON_DEATH = require('death');
const app = new Client();
const mora = require('./src/utils/bot/moraStorage');

require('./src/express/app');

setInterval(function () {
    mora.backup();
    console.log('Mora saved to flat file!')
}, 100000);

(async () => {
    app.commands = new Map();
    app.events = new Map();
    app.prefix = config.prefix;
    await registerCommands(app, '../commands');
    await registerEvents(app, '../events');
    mora.loadFromJson();
    await app.connect(config.token, config.refreshtoken).then(console.log('Bot connected!'));
    await app.rooms.join('819ae88c-94aa-4377-a31f-5affa9178295');
})();

ON_DEATH(async function () {
    console.log('Mora is saving...');

    mora.backup();
    console.log('Mora saved!');
    process.exit();
});