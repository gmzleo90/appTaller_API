const express = require('express');
const app = express();

// all environments
//app.use(express.bodyParser());



app.get('/', (req, res) => {
    res.send('SERVER UP!');
})

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})