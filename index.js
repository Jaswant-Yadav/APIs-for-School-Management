// app.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); 

const schoolsRoutes = require('./routes/schools');

app.use('/api', schoolsRoutes);

app.get('/', (req, res) => res.send('School API is up.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
