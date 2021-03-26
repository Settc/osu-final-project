const db = require("../models")

module.exports = (app) => {
    app.get("/api/clients/", (req, res) => {
        db.Client.findAll({})
        .then((dbClient) => res.json(dbClient))
    })

    app.get("/api/clients/:name", (req, res) => {
        db.Client.findAll({
            where: {
                fullName: req.params.name
            }
        }).then((dbClient) => {
            res.json(dbClient)
        })
    })

    app.post("/api/clients", (req, res) => {
        db.Client.create({
          fullName: req.body.name,
          address: req.body.address,
          email: req.body.email
        }).then((dbClient) => res.json(dbClient))
    })
}