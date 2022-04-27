const db = require("../config/DBconfig");
const table = "monthly_details"

const getAll = (res) => {
    const query = `SELECT *
                   FROM ${table}`;
    db.query(query, (err, results) => {
        if (err) return err;
        res.send(results);
    });
};

const get = (res, req) => {
    const date = req.query.date
    const query = `SELECT *
                   FROM ${table}
                   WHERE date = '${date}'`

    db.query(query, (err, results) => {
        if (err) return err
        res.send(results)
    })
}

const total = (res) => {
    const query = `SELECT SUM(daily_cheque) as 'DALIY CHEQUE DEPOSIT(DFCC & COM)', SUM(daily_cash) as 'DAILY CASH DEPOSIT', SUM(cash_opening) as 'MAIN CASH OPENING BALANCE', SUM(pd_cheque) as 'UP TODAY PD CHEQUES', SUM(openig_stock) as 'OPENING STOCK BALANCE', SUM(daily_sales) as 'DAILY SALES VALUE', SUM(purchase_valuve) as 'UP TODAY PURCHASE VALUE', SUM(closing_cash) as 'CLOSING MAIN CASH BALANCE', SUM(closing_stock) as 'CLOSING STOCK BALANCE', SUM(bank_closingod) as 'BANK CLOSING OD'
                   FROM ${table}`
    db.query(query, (err, results) => {
        if (err) return err;
        res.send(results);
    });
}

const store = (res, req) => {
    const keys = Object.keys(req.body)
    const arr = []
    let query;

    keys.forEach(key => {
        arr.push(req.body[key])
    })

    query = `DELETE
             FROM ${table}
             WHERE date='${req.body.date}'`
    db.query(query)

    query = `INSERT INTO ${table} (${keys.toString()})
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    db.query(query, arr)

    res.sendStatus(200)
}


module.exports = {getAll, total, store, get};
