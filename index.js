const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

// middlewares
app.use(bodyParser.json());//parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({         //cors 
    origin: 'https://app-taller.vercel.app'
}))



app.get('/api/clients/general', (req, res) => {
    res.json([{
        id:1,
        firstName:'Leonardo',
        lastName:'Gomez',
        phone:'1130406130',
        address:'Paso 1308 Garin',
        cuit:'20350983555',
        dni:'35098355',
}])});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})