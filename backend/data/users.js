import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Piyush",
        email: "p@g.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Anish",
        email: "a@g.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Nitin",
        email: "n@g.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Ramesh",
        email: "r@g.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    }
];



export default users