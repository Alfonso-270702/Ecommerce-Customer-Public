const request = require('supertest')
const app = require('../app')
const { verifyToken } = require('../helpers/jwt')

describe('test user login',()=>{
    test('user login success',(done)=>{
        const admin = { email: 'admin@mail.com', password: '12345678'}
        request(app)
            .post('/login')
            .send(admin)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response=>{
                expect(response.body.email).toBe(admin.email)
                expect(response.body.token).toStrictEqual(expect.any(String))
                let decodedToken = verifyToken(response.body.token)
                expect(decodedToken.email).toBe(admin.email)
                expect(response.body.msg).toBe('successfully login')
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
    test('user login fail because password wrong',(done)=>{
        const fakeAdmin = { email: 'admin@mail.com', password: '1234567'}
        request(app)
            .post('/login')
            .send(fakeAdmin)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response=>{
                expect(response.body.errors).toStrictEqual(['email or password are wrong'])
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
    test('user login fail because email wrong',(done)=>{
        const invalidAdmin = { email: 'admin1@mail.com', password: '12345678'}
        request(app)
            .post('/login')
            .send(invalidAdmin)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response=>{
                expect(response.body.errors).toStrictEqual(["No user found"])
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
    test('user login fail because email empty',(done)=>{
        const noEmailAdmin = { email: '', password: '12345678'}
        request(app)
            .post('/login')
            .send(noEmailAdmin)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response=>{
                expect(response.body.errors).toStrictEqual(["No user found"])
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
    test('user login fail because password empty',(done)=>{
        const noPassAdmin = { email: 'admin@mail.com', password: ''}
        request(app)
            .post('/login')
            .send(noPassAdmin)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response=>{
                expect(response.body.errors).toStrictEqual(["email or password are wrong"])
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