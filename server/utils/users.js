// [{}]

// var addUser (id, name, room) {

// };

// var removeUser (id) {

// };

// var getUser (id) {

// };

// var getUsersList (room) {

// };

// module.exports = {
//     addUser,
//     removeUser,
//     getUser,
//     getUsersList
// }

class Users {
    constructor() {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {
            id,
            room,
            name
        };
        this.users.push(user);

        return user;
    }

    removeUser (id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id != id);
        }
        return user;
    }
    
    getUser (id) {
        return this.users.find(user => user.id === id);
    }
    
    getUserList (room) {
        return this.users.filter((user) => user.room === room).map(user => user.name);
    }
}

module.exports = {Users};