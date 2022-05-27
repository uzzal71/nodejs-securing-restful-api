import { 
    addNewContact, 
    getContacts, 
    getContactWithID, 
    updateContact,
    deleteContact 
} from '../controllers/crmController';

import { 
    login, 
    register, 
    loginRequired 
} from '../controllers/userControllers'

import { 
    addNewDepartment, 
    getDepartments, 
    getDepartmentWithID, 
    updateDepartment,
    deleteDepartment 
} from '../controllers/departmentController';

import { 
    addNewDesignation, 
    getDesignations, 
    getDesignationWithID, 
    updateDesignation,
    deleteDesignation 
} from '../controllers/designationController';

const routes = (app) => {
    app.route('/contacts')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, loginRequired, getContacts)
    
    // POST endpoint
    .post(loginRequired, addNewContact);

    app.route('/contact/:contactId')
    // get specific contact
    .get(loginRequired, getContactWithID)
    
    // put request
    .put(loginRequired, updateContact)

    // delete request
    .delete(loginRequired, deleteContact);

    app.route('/departments')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, loginRequired, getDepartments)
    
    // POST endpoint
    .post(loginRequired, addNewDepartment);

    app.route('/department/:departmentId')
    // get specific contact
    .get(loginRequired, getDepartmentWithID)
    
    // put request
    .put(loginRequired, updateDepartment)

    // delete request
    .delete(loginRequired, deleteDepartment);

    app.route('/designations')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, loginRequired, getDesignations)
    
    // POST endpoint
    .post(loginRequired, addNewDesignation);

    app.route('/designation/:designationId')
    // get specific contact
    .get(loginRequired, getDesignationWithID)
    
    // put request
    .put(loginRequired, updateDesignation)

    // delete request
    .delete(loginRequired, deleteDesignation);

    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/login')
        .post(login);
}

export default routes;
