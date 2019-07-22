const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookSchema = new Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
    specialties: Array,
    nationality: String,
    picture: {
        type: String,
        default: 'https://gousto.gurucloud.co.uk/wp-content/uploads/2017/03/quiz-what-kind-of-cook-are-you.jpg'
    }
})

const Cook = mongoose.model("cooks", cookSchema, "cooks");

module.exports = Cook;