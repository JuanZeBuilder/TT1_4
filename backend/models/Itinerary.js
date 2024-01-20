const sql = require("../db/config");

const Instrument = function (instrument) {
    this.ISIN = instrument.isin;
    this.INSTRUMENT = instrument.instrumentName;
    this.SYMBOL = instrument.symbol;
    this.CURRENCY = instrument.currency;
    this.ASK_PRICE = instrument.askPrice;
    this.BID_PRICE = instrument.bidPrice;
    this.ROUND_LOT = instrument.roundPrice;
};

Instrument.getAll = result => {
    let query = "SELECT * FROM corporatebanking.instrument";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("instrument: ", res);
        result(null, res);
    });
};

module.exports = Instrument;
