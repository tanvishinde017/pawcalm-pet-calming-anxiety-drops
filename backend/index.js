require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/calming-drops';

if (require.main === module) {
  mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch((err) => { console.error(err.message); process.exit(1); });
}

module.exports = app;
