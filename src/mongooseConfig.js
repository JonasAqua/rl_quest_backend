const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(process.env.DBHOST, {useNewUrlParser: true}).
    catch(error => handleError(error));
}