const request = require('supertest')
const app = require('../app')
const { createToken } = require('../helpers/jwt')
const {queryInterface} = require('../models').sequelize

beforeAll(()=>{
    queryInterface.bulkDelete('Products')
})

describe('test product',()=>{
    let payload = {
        id: 1,
        email: 'admin@mail.com',
        role: 'admin'
    }
    let token = createToken(payload)
    let currentId = null
    //  ================================ CREATE SECTION =================================
    test('test create product success',(done)=>{
        let product = {
            name: 'Sepatu Adidas',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 5000000,
            stock: 1
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response=>{
            currentId = response.body.id
            expect(response.body.name).toBe(product.name)
            expect(response.body.image_url).toBe(product.image_url)
            expect(response.body.price).toBe(product.price)
            expect(response.body.stock).toBe(product.stock)
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test create product fail because empty name',(done)=>{
        let product = {
            name: '',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 5000000,
            stock: 1
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual(["Name can't be empty"])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test create product fail because image url empty',(done)=>{
        let product = {
            name: 'Sepatu Adidas',
            image_url: '',
            price: 5000000,
            stock: 1
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual(["Image url can't be empty", 'Invalid url'])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test create product fail because image url invalid',(done)=>{
        let product = {
            name: 'Sepatu Adidas',
            image_url: 'htps://encrypted-tbn0.gstatic/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAUuauaua',
            price: 5000000,
            stock: 1
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual(["Invalid url"])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test create product fail because price empty',(done)=>{
        let product = {
            name: 'Sepatu Adidas',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: '',
            stock: 1
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            // console.log(response.body)
            expect(response.body.errors).toStrictEqual([ "Price can't be empty"])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test create product fail because price below 0',(done)=>{
        let product = {
            name: 'Sepatu Adidas',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: -100000,
            stock: 1
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            // console.log(response.body)
            expect(response.body.errors).toStrictEqual(['Price cant below 0'])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test create product fail because stock empty',(done)=>{
        let product = {
            name: 'Sepatu Adidas',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 5000000,
            stock: ''
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            // console.log(response.body)
            expect(response.body.errors).toStrictEqual(["Stock can't be empty"])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test create product fail because stock below 0',(done)=>{
        let product = {
            name: 'Sepatu Adidas',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 5000000,
            stock: -1
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual(["Stock cant below 0"])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    // ================================ READ SECTION =================================
    test('test get all product success',(done)=>{
        request(app)
        .get('/products')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response=>{
            // console.log(currentId)
            expect(response.body[0].name)
            expect(response.body[0].image_url)
            expect(response.body[0].price)
            expect(response.body[0].stock)
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    //  ================================ UPDATE SECTION =================================
    test('test update product success', (done)=>{
        let editProduct = {
            name: 'Sepatu Adidas Baru',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 6000000,
            stock: 2
        }
        request(app)
        .put(`/products/${currentId}`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response=>{
            expect(response.body.msg).toBe('success edit product')
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test update product fail because name empty', (done)=>{
        let editProduct = {
            name: '',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 6000000,
            stock: 2
        }
        request(app)
        .put(`/products/${currentId}`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual(["Name can't be empty"])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test update product fail because image url empty', (done)=>{
        let editProduct = {
            name: 'Sepatu Adidas Baru',
            image_url: '',
            price: 6000000,
            stock: 2
        }
        request(app)
        .put(`/products/${currentId}`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual(["Image url can't be empty", 'Invalid url'])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test update product fail because image url invalid', (done)=>{
        let editProduct = {
            name: 'Sepatu Adidas Baru',
            image_url: 'htps://encrypted-tbn0.gstatic/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAUuauauaAingmawek',
            price: 6000000,
            stock: 2
        }
        request(app)
        .put(`/products/${currentId}`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual(['Invalid url'])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test update product fail because price empty', (done)=>{
        let editProduct = {
            name: 'Sepatu Adidas Baru',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: '',
            stock: 2
        }
        request(app)
        .put(`/products/${currentId}`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual([  "Price can't be empty" ])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test update product fail because price below 0', (done)=>{
        let editProduct = {
            name: 'Sepatu Adidas Baru',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: -100000,
            stock: 2
        }
        request(app)
        .put(`/products/${currentId}`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual([ 'Price cant below 0' ])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test update product fail because stock empty', (done)=>{
        let editProduct = {
            name: 'Sepatu Adidas Baru',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 6000000,
            stock: ''
        }
        request(app)
        .put(`/products/${currentId}`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual([ "Stock can't be empty" ])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test update product fail because stock below 0', (done)=>{
        let editProduct = {
            name: 'Sepatu Adidas Baru',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 6000000,
            stock: -11
        }
        request(app)
        .put(`/products/${currentId}`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual([ 'Stock cant below 0'])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    //  ================================ DELETE SECTION =================================
    test('test delete product success',(done)=>{
        request(app)
        .delete(`/products/${currentId}`)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response=>{
            expect(response.body.msg).toBe('success delete')
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    //  ================================ AUTHENTICATION =================================
    test('test email authentication not match',(done)=>{
        let payload = {
            id: 2,
            email: 'admin1@mail.com',
            role: 'admin'
        }
        let tokenInvalid = createToken(payload)
        let product = {
            name: 'Sepatu Adidas',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 5000000,
            stock: 1
        }
        request(app)
        .post('/products')
        .send(product)
        .set('token', tokenInvalid)
        .expect('Content-Type', /json/)
        .expect(401)
        .then(response=>{
            expect(response.body.errors).toStrictEqual([ "authentication failed" ])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    test('test token authentication not found',(done)=>{
        let product = {
            name: 'Sepatu Adidas',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 5000000,
            stock: 1
        }
        request(app)
        .post('/products')
        .send(product)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual([ "token not found" ])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
    //  ================================ AUTHORIZATION =================================
    test('test authorization product not found',(done)=>{
        let editProduct = {
            name: 'Sepatu Adidas Baru',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFrG7sCWRFRm_ML-GrHm0acCXTANVLfYSHOw&usqp=CAU',
            price: 6000000,
            stock: 2
        }
        request(app)
        .put(`/products/1000`)
        .send(editProduct)
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response=>{
            expect(response.body.errors).toStrictEqual([ "Product not found" ])
            done()
        })
        .catch(err=>{
            if(err){
                done(err)
            }
            else{
                done()
            }
        })
    })
})