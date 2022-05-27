import mongoose from 'mongoose';
import { DepartmentSchema } from '../models/departmentSchema';

const Department = mongoose.model('Department', DepartmentSchema);

export const addNewDepartment= (req, res) => {
    let newDepartment= new Department(req.body);

    newDepartment.save((err, department) => {
        if (err) {
            res.send(err);
        }
        res.json(department);
    });
};

export const getDepartments = (req, res) => {
    Department.find({}, (err, department) => {
        if (err) {
            res.send(err);
        }
        res.json(department);
    });
};

export const getDepartmentWithID = (req, res) => {
    Department.findById(req.params.departmentId, (err, department) => {
        if (err) {
            res.send(err);
        }
        res.json(department);
    });
}

export const updateDepartment= (req, res) => {
    Department.findOneAndUpdate({ _id: req.params.departmentId}, req.body, { new: true }, (err, department) => {
        if (err) {
            res.send(err);
        }
        res.json(department);
    })
}

export const deleteDepartment= (req, res) => {
    Department.remove({ _id: req.params.departmentId }, (err, department) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted department'});
    })
}