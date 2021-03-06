require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');

describe('color routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create color', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name:'test post',
        hex:'my favorite hex',
        red:10,
        green:20,
        blue:30
      })
      .then(newColor=>{
        expect(newColor.body).toEqual({
          _id:expect.any(String),
          __v:0,
          name:'test post',
          hex:'my favorite hex',
          red:10,
          green:20,
          blue:30
        });
      });

  });
  it('can get a list of colors', ()=>{
    return request(app)
      .post('/api/v1/colors')
      .send({
        name:'test post',
        hex:'my favorite hex',
        red:10,
        green:20,
        blue:30
      })
      .then(()=>{
        return request(app)
          .get('/api/v1/colors')
          .then(found=>{
            expect(found.body).toHaveLength(1);
          });
     
      });
  });
  it('can get a color by id', ()=>{
    return request(app)
      .post('/api/v1/colors')
      .send({
        name:'test post',
        hex:'my favorite hex',
        red:10,
        green:20,
        blue:30
      })
      .then(createdColor=>{
        const colorId = createdColor.body._id;
        console.log('colorId', colorId);
        return request(app)
          .get(`/api/v1/colors/${colorId}`);
      })
      .then(found=>{
        expect(found.body).toEqual(
          { _id:expect.any(String),
            __v:0,
            name:'test post',
            hex:'my favorite hex',
            red:10,
            green:20,
            blue:30 });
      });
  });
  it('can patch a color', ()=>{
    return request(app)
      .post('/api/v1/colors')
      .send({
        name:'test post',
        hex:'my favorite hex',
        red:10,
        green:20,
        blue:30
      })
      .then(createdColor=>{
        const colorId = createdColor.body._id;
        return request(app)
          .patch(`/api/v1/colors/${colorId}`)
          .send({ name:'better name' })
          .then(updated=>{
            expect(updated.body).toEqual(
              { _id:expect.any(String),
                __v:0,
                name:'better name',
                hex:'my favorite hex',
                red:10,
                green:20,
                blue:30 });
          });
      });
  
  });
  it('can delete a color by id', ()=>{
    return request(app)
      .post('/api/v1/colors')
      .send({
        name:'test post',
        hex:'my favorite hex',
        red:10,
        green:20,
        blue:30
      })
      .then(createdColor=>{
        const colorId = createdColor.body._id;
        console.log('colorId', colorId);
        return request(app)
          .delete(`/api/v1/colors/${colorId}`);
      })
      .then(deleted=>{
        expect(deleted.body).toEqual(
          { _id:expect.any(String),
            __v:0,
            name:'test post',
            hex:'my favorite hex',
            red:10,
            green:20,
            blue:30 });
      });
  });
 

  
});
