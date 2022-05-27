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

export const getTaxs = (req, res) => {
    Tax.find({}, (err, tax) => {
        if (err) {
            res.send(err);
        }
        res.json(tax);
    });
};

export const getTaxWithID = (req, res) => {
    Tax.findById(req.params.taxId, (err, tax) => {
        if (err) {
            res.send(err);
        }
        res.json(tax);
    });
};

export const updateTax = (req, res) => {
    Tax.findOneAndUpdate({ _id: req.params.taxId}, req.body, { new: true }, (err, tax) => {
        if (err) {
            res.send(err);
        }
        res.json(tax);
    })
};

export const deleteTax = (req, res) => {
    Tax.remove({ _id: req.params.taxId }, (err, tax) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted tax'});
    })
};