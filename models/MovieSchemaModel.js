const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxLength: [20, ' `{PATh}` alanı `{VALUE}` karakterden küçük olmalıdır.'],
        minLength: [2, ' `{PATh}` alanı `{VALUE}` karakterden büyük olmalıdır.']
    },
    category: {
        type: String,
        maxLength: [20, ' `{PATh}` alanı `{VALUE}` karakterden küçük olmalıdır.'],
        minLength: [2, ' `{PATh}` alanı `{VALUE}` karakterden büyük olmalıdır.']
    },
    country: {
        type: String,
        maxLength: [20, ' `{PATh}` alanı `{VALUE}` karakterden küçük olmalıdır.'],
        minLength: [2, ' `{PATh}` alanı `{VALUE}` karakterden büyük olmalıdır.']
    },
    year: {
        type: Number,
        max: [2022, ' `{PATh}` alanı `{VALUE}` karakterden küçük olmalıdır.'],
        min: [1980, ' `{PATh}` alanı `{VALUE}` karakterden büyük olmalıdır.']
    },
    imdb_score: {
        type: Number,
        max: [10, ' `{PATh}` alanı `{VALUE}` karakterden küçük olmalıdır.'],
        min: [0, ' `{PATh}` alanı `{VALUE}` karakterden büyük olmalıdır.']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('movies', MovieSchema);