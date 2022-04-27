const db = require("../config/DBconfig");

const table = "cash_flow_forecast"

const dates = (res) => {
    const query = `SELECT date
                   FROM ${table}`
    db.query(query, (err, results) => {
        if (err) return err
        res.send(results)
    })
}

const get = (res, req) => {
    const from = req.query.from
    const to = req.query.to
    const query = `SELECT *
                   FROM ${table}
                   WHERE date between '${from}' and '${to}'`

    db.query(query, (err, results) => {
        if (err) return err
        res.send(results)
    })
}

const today = (res, req) => {
    const date = req.query.date
    const query = `SELECT *
                   FROM ${table}
                   WHERE date = '${date}'`

    db.query(query, (err, results) => {
        if (err) return err
        res.send(results)
    })
}

const store = (res, req) => {
    const keys = Object.keys(req.body)
    const arr = []

    keys.forEach(key => {
        arr.push(req.body[key])
    })

    let query = `DELETE
                 FROM ${table}
                 WHERE date='${req.body.date}'`
    db.query(query)

    query = `INSERT INTO ${table} (${keys.toString()})
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    db.query(query, arr)

    res.sendStatus(200)
}

module.exports = {store, get, dates, today}