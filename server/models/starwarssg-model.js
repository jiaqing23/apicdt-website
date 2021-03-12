import mongoose from 'mongoose';

const starwarsSchema = mongoose.Schema({
    token: String,
    time: String,
    name: String,
    count: Boolean,
    day: Number,
    hour: Number,
    minute: Number,
    second: Number,
})

// registerModel.plugin(uniqueValidator);
starwarsSchema.index({ token: "text" });
var starwarsModel = mongoose.model('StarWarssg', starwarsSchema);


export default starwarsModel;

