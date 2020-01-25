const User = require('../models/user');
const mongoose = require('mongoose');

 

// use the new name of the database
const url = 'mongodb://localhost:27017/groceryappDbTesting'; 
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});


describe('User Schema testing', () => {
    // the code below is for insert testing
        it('Add user', () => {
            const user = {
                'fullname': 'Anmol23 Koirala',
                'email': 'anmol323@gmail.com',
                'password': 'anmol23',
                'contactnum': '9467516994',
                'address': 'Jhapa',
                };



            return User.create(user)
                .then((pro_ret) => {
                    expect(pro_ret.email).toEqual("anmol323@gmail.com");
                });
        });




})