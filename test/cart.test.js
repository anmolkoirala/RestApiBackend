const UserCart = require('../models/usercart');
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


describe('User Cart Schema testing', () => {
    // the code below is for insert testing
        it('Add item to cart', () => {
            const usercart = {
                'productid': '5e347cdbe0eafd2d4e6fda80',
                'productname': 'Sweet Potato',
                'productprice': '120',
                'productcategory': 'vegetables',
                'productimage': 'image-1580498139510.png',
                'productnumber': 8,
                'addedbyName': 'Obi Wan Kenobi',
                'addedbyID': '5e2f14011fee7c13aded5409',
            };



            return UserCart.create(usercart)
                .then((pro_ret) => {
                    expect(pro_ret.productnumber).toEqual(8);
                });
        });



})