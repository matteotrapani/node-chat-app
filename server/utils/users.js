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
            room: room.toLowerCase(),
            name: name.toLowerCase()
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
    
    getUserByName (name) {
        return this.users.find(user => user.name === name.toLowerCase());
    }
    
    getUserList (room) {
        return this.users.filter((user) => user.room === room).map(user => user.name);
    }

    getRooms () {
        var rooms = this.users.map(user => user.room);
        return rooms.filter((room, pos, arr) => arr.indexOf(room) === pos);
    }
}

module.exports = {Users};