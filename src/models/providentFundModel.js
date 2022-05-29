import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProvidentFundSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: Double,
        required: true
    },
});