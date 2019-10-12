const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app')

describe('PlayServer App', () =>{
  it('should return a message from GET /', ()=>{
    return supertest(app)
    .get('/')
    .expect(200, 'This is the home page who hoo!');
  })
  it('Should return results as a json from /apps', ()=>{
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
  })
  it('Should filter the genre of the apps', () =>{
    return supertest(app)
      .get('/apps')
      .query( { filterCriteria: 'Strategy' } )
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body[0].Genres).to.deep.include('Strategy')
      })
      
  })
})