const express = require('express');
const app = express();
const port = process.env.VUE_APP_PORT || 3000;

const staticFileMiddleware = express.static(__dirname + '/dist/');
app.use(staticFileMiddleware);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});