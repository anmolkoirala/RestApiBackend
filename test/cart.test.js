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


    // delete individual cart by id
        it('to test the delete cart is working or not', async () => {
            const status = await UserCart.deleteOne({_id :Object('5e48154cbb135629216a4d2a')});
            expect(status.ok).toBe(1);
        })


       // delete all user cart list
        it('to test the delete cart is working or not', async () => {
            const status = await UserCart.deleteMany();
            expect(status.ok).toBe(1);
        })


        // update user cart detail
    it('to test the cart update', async () => {

        return UserCart.findOneAndUpdate({_id :Object('5e4813813ae83827ebc2825d')}, {$set : {productnumber:8}})
        .then((pp)=>{
            expect(pp.productnumber).toEqual(8)
        })

    });

    


})