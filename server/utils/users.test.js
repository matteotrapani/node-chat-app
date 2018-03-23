const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'test1',
            room: 'room1'
        },
        {
            id: 2,
            name: 'test2',
            room: 'room2'
        },
        {
            id: 3,
            name: 'test3',
            room: 'room1'
        }]
    });

    test('Should add new user', () => {
        var users = new Users();
        var user = {
            id: 123, 
            name: 'UserTest', 
            room: 'UserTestRoom'
        }
        var result = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        expect(result).toEqual(user);
    });

    test('should return two users in room1', () => {
        var result = users.getUserList('room1')

        expect(result.length).toBe(2);
        expect(result[0]).toBe(users.users[0].name);
        expect(result[1]).toBe(users.users[2].name);
    });

    test('should return one users in room2', () => {
        var result = users.getUserList('room2')

        expect(result.length).toBe(1);
        expect(result[0]).toBe(users.users[1].name);
    });

    test('should return user with ID 1', () => {
        var result = users.getUser(1);

        expect(result).toBeTruthy();
        expect(result).toEqual(users.users[0]);
    });

    test('should return user with ID 2', () => {
        var result = users.getUser(2);

        expect(result).toBeTruthy();
        expect(result).toEqual(users.users[1]);
    });

    test('should return user with ID 3', () => {
        var result = users.getUser(3);

        expect(result).toBeTruthy();
        expect(result).toEqual(users.users[2]);
    });

    test('should return no user with wrong ID', () => {
        var result = users.getUser(100);

        expect(result).toBeFalsy();
    });

    test('should remove user with ID 1 and return it', () => {
        var expectedDeletedUser = users.users[0];
        var result = users.removeUser(1);

        expect(result).toBeTruthy();
        expect(result).toEqual(expectedDeletedUser);
        expect(users.users.length).toBe(2);
    });

    test('should not remove user with not existing ID', () => {
        var result = users.removeUser(100);

        expect(result).toBeFalsy();
        expect(users.users.length).toBe(3);
    })
});