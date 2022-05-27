import mongoose from 'mongoose';
import { TaxSchema } from '../models/taxModel';

const Tax = mongoose.model('Contact', TaxSchema);

export const addNewTax = (req, res) => {
    let newTax = new Tax(req.body);

    newTax.save((err, tax) => {
        if (err) {
            res.send(err);
        }
        res.json(tax);
    });
};