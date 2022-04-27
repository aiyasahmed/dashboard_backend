const express = require("express");
const cors = require("cors");
const Details = require("../Models/Details");
const CashFlow = require("../Models/CashFlowForeCast");
const app = express();

app.options("*", cors());
app.use(express.json())

app.get("/details", (req, res) => {
    Details.getAll(res);
});

app.get("/detail", (req, res) => {
    Details.get(res, req)
})

app.post("/details", (req, res) => {
    Details.store(res, req);
});

app.get("/details-sum", (req, res) => {
    Details.total(res);
});

app.post("/cash-flow", (req, res) => {
    CashFlow.store(res, req)
});

app.get("/cash-flow", (req, res) => {
    CashFlow.get(res, req)
});

app.get("/cash-flow/dates", (req, res) => {
    CashFlow.dates(res)
});

app.get("/cash-flow/today", (req, res) => {
    CashFlow.today(res, req)
});

module.exports = app;