const mongoose = require('mongoose')

async function dbConnection(url) {
    await mongoose.connect(url)
        .then(() => console.log('Mongo DB is connected.'))
        .catch(() => console.log('Mongo DB is not connected.'))
}

module.exports = dbConnection