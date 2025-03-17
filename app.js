const express = require('express');
const cors = require('cors');
const path = require('path');
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve React static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/test', (req, res) => {
  res.json({ message: 'React is connected to Express!' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
