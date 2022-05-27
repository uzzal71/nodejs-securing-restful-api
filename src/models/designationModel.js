import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DesignationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_date: {
       type: Date,
       default: Date.now 
    }
});