
'use strict';

// const b64 = require('js-base64');
// const { sequelize, User } = require('../src/auth/models');
// const { signin } = require('../src/models');
// const { describe } = require('node:test');

// describe('auth routes', ()=>{
//     it("returns a web token for a sign in route", async()=>{
//         await sequelize.sync();
//         await User.cre
//     })
// })
=======
// const jwt = require('jsonwebtoken');

const b64 = require('js-base64');
const { sequelize,AuthUser } = require('../src/models');
const { signin } = require ('../src/auth/routes/index')



describe('Auth Routes', ()=>{

    it('returns a webtoken for a signin route', async ()=>{
        
        // syncing my database

        await sequelize.sync();
        // created hashed user with the CWH function
        await AuthUser.createWithHashed('Chris', 'Lopez');
        
        // beforeEach(()=> sequelize.sync());
        // afterEach(()=> sequelize.drop());
        
        // arrange 
        // User.createWithHashed('Chris', 'Lopez');
        
        
        // req needs header function
        // basically saying if this header reads authorized.. return the concatinated string "basic" + "Chris Lopez"
        // if the header reads that than the req takes that variable or a blank string gets returned.
        const req = {header: jest.fn().mockImplementation((header)=>{
            if(header=== 'Authorization'){
                return 'Basic ' + b64.encode('Chris:Lopez');
            }
            return '';
        }),
    };

    // declaring the variables responsd
    const res = { send: jest.fn() };
    const next = jest.fn();
    await signin(req, res,next);
    
    // assert
    const token = res.send.mock.lastCall[0];
    const [_header,payloadBase64,_signature] = token.split('.');
    const payload = JSON.parse(b64.decode(payloadBase64));
    console.log(token);
    expect(payload.username).toBe('Chris');
});
// 
});

