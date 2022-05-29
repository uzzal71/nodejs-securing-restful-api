import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now 
     }
});