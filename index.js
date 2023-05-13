const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/db');

// middlewares
app.use(bodyParser.json());//parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({         //cors 
    origin: 'https://app-taller.vercel.app'
}))



app.get('/api/clients/general', (req, res) => {
    res.json([{
        id: 1,
        firstName: 'Leonardo',
        lastName: 'Gomez',
        phone: '1123345678',
        address: 'Pasaje 345 Garin',
        cuit: '20323254605',
        dni: '32325460',
    }])
});
app.get('/api/clients/checking-accounts', (req, res) => {
    res.json([{
        id: 2,
        firstName: 'Jorge',
        lastName: 'Sarandí',
        phone: '1123345678',
        address: 'Roma 123 Pilar',
        cuit: '20323254605',
        dni: '32325460',
    }])
});

const PORT = 3000 || process.env.PORT;

db.sync(
    //{ force: true }
).then(() => {
    app.listen(PORT, () => {
        console.log('-> Server Message: Db Sync OK!');
        console.log(`-> Server Message: Server Up! on http://localhost:${PORT}`);
    })
})