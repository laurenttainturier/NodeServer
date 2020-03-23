const Datastore = require('nedb');
const util = require('util');
const userDB = new Datastore({ filename: 'user.db', autoload: true });

function convertToPromise(func, ...args) {
    return new Promise((resolve, reject) => {
        func(...args, (err, result) => {
            if (err) reject(error);
            else resolve(result);
        });
    });
}

exports.asyncInserUser = (newUser, ...args) => {
    return convertToPromise(userDB.insert, newUser, ...args);
    // .catch(err => {console.log(`Cannot insert user: ${err}`)})
};

exports.asyncTimeout = (...args) => {
    return convertToPromise(setTimeout, 1, ...args);
    // .catch(err => {console.log(`Cannot insert user: ${err}`)})
};

exports.asyncGetAllUsers = () => {
    return convertToPromise(userDB.insert).catch(err => {
        console.log(`Cannot get all users: ${err}`);
    });
};

exports.asyncDeleteAll = () => {
    return convertToPromise(userDB.remove).catch(err => {
        throw new Error(`Cannot delete all users: ${err}`);
    });
};

exports.deleteAll = () => {
    return new Promise((resolve, reject) =>
        userDB.remove({}, { multi: true }, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        })
    );
};

exports.insertUser = newUser => {
    return new Promise((resolve, reject) =>
        userDB.insert(newUser, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        })
    ).catch(err => {
        throw new Error(`Cannot insert user ${JSON.stringify(newUser)}: ${err}`);
    });
};

exports.getAllUsers = () => {
    return new Promise((resolve, reject) =>
        userDB.find({}, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        })
    ).catch(err => {
        throw new Error(`Cannot get all users: ${err}`);
    });
};

exports.getUserById = id => {
    return new Promise((resolve, reject) =>
        userDB.findOne({ _id: id }, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        })
    ).catch(err => {
        throw new Error(`Cannot get user with id ${id}: ${err}`);
    });
};
