const express = require('express');
require('dotenv').config();
const dbCon = require('./database/sqlite');
dbCon.sync();

// Routes
const userRoutes = require('./routes/user');
const travelRoutes = require('./routes/travels');
const authRoutes = require('./routes/auth');
/// console.log(process.env.PASSWORD_KEY);
const app = express();

// Inbuilt middleware
app.use(express.json({}));
app.use(express.urlencoded({extended:true}));

// Routes middleware
app.use('/api', userRoutes);
app.use('/api', travelRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    return res.json({
        message: 'This is travels site api\'s for both get and post request',
        user: 'api/users',
        travels: 'api/travels'
    });
});



const port = process.env.PORT || 3000;

app.listen(port, console.log(`Serve started on port ${port}`));