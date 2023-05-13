const express = require('express');
const app = express();

// all environments
//app.use(express.bodyParser());



app.get('/api/clients/general', (req, res) => {
    res.json([{
        id:1,
        fullName:'Leonardo Gomez',
        phone:'1130406130',
        address:'Paso 1308 Garin',
        cuit:'20350983555',
        dni:'35098355',
}])});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})