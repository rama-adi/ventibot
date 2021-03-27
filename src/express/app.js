const express = require('express');
const app = express();
const port = 3000;
const expressWs = require('express-ws')(app);
const paystream = expressWs.getWss('/payment-streams');
exports.wsBroadcast = (data) => broadcast(data);

const broadcast = function (data) {
    paystream.clients.forEach((the_client) => {
        the_client.send(JSON.stringify(data));
    })
}

app.get('/', (req, res) => {
    res.send('OK!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.ws('/payment-streams', function(ws, req) {
    console.log('New listener!');
});

