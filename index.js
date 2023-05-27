const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db');
const User = require('./db/models/User');
const Customer = require('./db/models/Customer');
const Vehicle = require('./db/models/Vehicle');
const Brand = require('./db/models/Brand');
const Turn = require('./db/models/Turn');

// middlewares
app.use(bodyParser.json());//parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({         //cors 
    origin: 'https://app-taller.vercel.app'
}))

//get all general clients
app.get('/api/clients/general', (req, res) => {
    Customer.findAll({ where: { customerType: false } }).then(result => {
        res.status(201).send(result);
    }).catch();
})



//get  checking accounts clients
app.get('/api/clients/checking-accounts', (req, res) => {
    Customer.findAll({ where: { customerType: true } }).then(result => res.send(result).status(200)).catch();
})

//get all clients
app.get('/api/clients/all-customers', (req, res) => {
    Customer.findAll().then(result => res.send(result).status(200)).catch();
})


app.post('/api/clients-create', (req, res) => {
    console.log(req.body);
    Customer.create({ ...req.body })
        .then(() => {
            console.log('created!');
            Customer.findAll({ where: { dni: req.body.dni } })
                .then(result => {
                    res.status(201).send(result);
                })
        })
        .catch((err) => {
            res.status(409).send(err.message);
            console.log(err);
        })
})

app.post('/api/vehicles-create', (req, res) => {
    Vehicle.create({ ...req.body })
        .then(() => {
            console.log('created!');
            Vehicle.findAll({ where: { domain: req.body.domain } })
                .then(result => {
                    res.status(201).send(result);
                })
        })
        .catch((err) => {
            //res.sendStatus(409)   
            console.log(err);
        })
});

app.get('/api/vehicles', (req, res) => {

    Vehicle.findAll({ include: [{ model: Customer }, { model: Brand }] })
        .then(result => {
            res.status(200).send(result);
        })

});

app.delete('/api/vehicles-delete', async (req, res) => {
    try {
        const searchResult = await
            Vehicle.findOne({
                where: {
                    id: req.query.id
                }
            });
        if (searchResult) {
            await Vehicle.destroy({ where: { id: req.query.id } });

            res.sendStatus(202);

        } else {
            res.send('no existe Id')
        }


    } catch (err) {
        if (err) res.send(err.message)
        console.log('ERROR: ', err.message)
    }

});


app.delete('/api/clients-delete', async (req, res) => {
    try {
        const searchResult = await
            Customer.findOne({
                where: {
                    id: req.query.id
                }
            });
        if (searchResult) {
            await Customer.destroy({ where: { id: req.query.id } });

            res.sendStatus(202);

        } else {
            res.send('no existe Id')
        }


    } catch (err) {
        if (err) res.send(err.message)
        console.log('ERROR: ', err.message)
    }

});

app.post('/api/vehicles/brands-create', (req, res) => {
    console.log(req.body);
    Brand.create({ ...req.body })
        .then(() => {
            console.log('created!');
            Brand.findAll({ where: { brandName: req.body.brandName } })
                .then(result => {
                    res.status(201).send(result);
                });
        })
        .catch((err) => {
            //res.sendStatus(409)   
            console.log(err);
        });

})

app.get('/api/vehicles/brands', async (req, res) => {
    const result = await Brand.findAll();
    res.status(200).send(result)
});

app.delete('/api/vehicles/brands-delete', async (req, res) => {
    try {
        const searchResult = await
            Brand.findOne({
                where: {
                    id: req.query.id
                }
            });
        if (searchResult) {
            await Brand.destroy({ where: { id: req.query.id } });

            res.sendStatus(202);

        } else {
            res.send('no existe Id')
        }


    } catch (err) {
        if (err) res.send(err.message)
        console.log('ERROR: ', err.message)
    }
});

//get client whit vehicles
app.get('/api/clients-and-vehicles', async (req, res) => {
    try {
        const result = await Vehicle.findOne({
            where: {
                id: req.query.id
            },
            include: [{
                model: Customer,
            }]
        });
        res.status(200).send(result)
    }
    catch (err) {
        console.log(err);
    }

});

app.post('/api/turns/turn-create', (req, res) => {
    const turn = Turn.create({ ...req.body })
        .then(() => {
            Turn.findAll()
                .then(result => {
                    res.status(201).send(result);
                });
        })
        .catch((err) => {
            //res.sendStatus(409)   
            console.log(err);
        });
})

app.delete('/api/turns/turn-delete', async (req, res) => {
    let turn = await Turn.destroy({ where: { id: req.query.id } });
    res.status(202).send(turn.id);
});

const PORT = 3000 || process.env.PORT;
db.sync().then(() => app.listen(PORT, () => console.log('DB and Service OK!')));

