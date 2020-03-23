const { deleteAll, getAllUsers, getUserById, insertUser } = require('./UserDatabase');

const users = [
    {
        firstname: 'thibaud',
        lastname: 'Bourgois'
    },
    {
        firstname: 'Théo',
        lastname: 'Herveux'
    }
];

describe('User database manipulation', () => {
    it('delete all users', async () => {
        await deleteAll();
    });

    it('insert users', async () => {
        for (const user of users) {
            const { _id, ...insertedUser } = await insertUser(user);
            expect(insertedUser).toStrictEqual(user);
            expect(_id).not.toBeNull();
        }
    });

    it('get all users', async () => {
        const getUsers = await getAllUsers();
        const { firstname, lastname, _id } = getUsers[0];

        expect(getUsers.length).toBe(users.length);
        expect(firstname).not.toBeNull();
        expect(lastname).not.toBeNull();
        expect(_id).not.toBeNull();
    });

    it('get user by id', async () => {
        const [expectedUser] = await getAllUsers();
        const { _id: expectedId, firstname: expectedFirstname, lastname: expectedLastname } = expectedUser;
        const { firstname, lastname, _id } = await getUserById(expectedId);

        expect(firstname).toBe(expectedFirstname);
        expect(lastname).toBe(expectedLastname);
        expect(_id).toBe(expectedId);
    });

    it('get non existing by id', async () => {
        const result = await getUserById('non_existing_user_id');
        expect(result).toBeNull();
    });
});
