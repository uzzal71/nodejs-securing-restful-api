import mongoose from 'mongoose';
import { DesignationSchema } from '../models/designationSchema';

const Designation = mongoose.model('Designation', DesignationSchema);

export const addNewDesignation= (req, res) => {
    let newDesignation= new Designation(req.body);

    newDesignation.save((err, designation) => {
        if (err) {
            res.send(err);
        }
        res.json(designation);
    });
};

export const getDesignations = (req, res) => {
    Designation.find({}, (err, designation) => {
        if (err) {
            res.send(err);
        }
        res.json(designation);
    });
};

export const getDesignationWithID = (req, res) => {
    Designation.findById(req.params.designationId, (err, designation) => {
        if (err) {
            res.send(err);
        }
        res.json(designation);
    });
}

export const updateDesignation= (req, res) => {
    Designation.findOneAndUpdate({ _id: req.params.designationId}, req.body, { new: true }, (err, designation) => {
        if (err) {
            res.send(err);
        }
        res.json(designation);
    })
}

export const deleteDesignation= (req, res) => {
    Designation.remove({ _id: req.params.designationId }, (err, designation) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted designation'});
    })
}