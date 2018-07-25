const express = require('express');
require('./services/passport');

const app = express();
//'require' imports the func in the path. '()' are the args for that func.
require('./routes/authRoutes')(app);

app.listen(4321);