const firebase = require('../../utils/firebaseAdmin');
const fs = require('fs');

module.exports = class {
    static _mora = {};
    static _JSONpath = __dirname + '/../../storage/mora.json'

    static get moraCollection() {
        return this._mora;
    }

    static updateMora(author, amount) {
        if (typeof this._mora[author.id] === "undefined" || null) {
            this._mora[author.id] = {
                username: author.username,
                amount: amount
            };
        } else {
            this._mora[author.id] = {
                username: author.username,
                amount: this._mora[author.id].amount + amount
            };
        }
    }

    static setMora(author, amount) {
        if (typeof this._mora[author.id] === "undefined" || null) {
            this._mora[author.id] = {
                username: author.username,
                amount: amount
            };
        } else {
            this._mora[author.id] = {
                username: author.username,
                amount: amount
            };
        }
    }

    static getUserMora(author) {
        if (typeof this._mora[author.id] === 'undefined' || null) {
            return null;
        } else {
            return this._mora[author.id].amount;
        }
    }

    static getUserMoraById(user_id){
        if (typeof this._mora[user_id] === 'undefined' || null) {
            return null;
        } else {
            return this._mora[user_id].amount;
        }
    }



    static loadFromJson() {
        this._mora = require('../../storage/mora.json');
        console.log('Loaded from JSON');
        console.table(this._mora);
    }

    static moraOwners() {

    }

    static backup() {
        fs.writeFileSync(this._JSONpath, JSON.stringify(this._mora, null, 2));
    }
}