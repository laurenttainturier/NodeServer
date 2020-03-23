const Datastore = require('nedb');
const userDB = new Datastore({ filename: 'user.db', autoload: true });

function convertToPromise(context, func, ...args) {
    return new Promise((resolve, reject) => {
        func.call(context, ...args, (err, result) => {
            if (err) reject(error);
            else resolve(result);
        });
    });
}

exports.insertUser = (newUser, ...args) => {
    return convertToPromise(userDB, userDB.insert, newUser, ...args).catch(err => {
        throw new Error(`Cannot insert user ${JSON.stringify(newUser)}: ${err}`);
    });
};

exports.getAllUsers = () => {
    return convertToPromise(userDB, userDB.find, {}).catch(err => {
        console.log(`Cannot get all users: ${err}`);
    });
};

exports.getUserById = id => {
    return convertToPromise(userDB, userDB.findOne, { _id: id }).catch(err => {
        console.log(`Cannot get user with id ${id}: ${err}`);
    });
};

exports.deleteAll = () => {
    return convertToPromise(userDB, userDB.remove, {}, { multi: true }).catch(err => {
        throw new Error(`Cannot delete all users: ${err}`);
    });
};
