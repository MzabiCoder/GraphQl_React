const mongoose = require('mongoose')
const config = require('config')
const DB_string = config.get('mongoURI')


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const DB_Connection = async () => {

    try {
        await mongoose.connect(DB_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB Connected...!!!')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }


}


module.exports = DB_Connection