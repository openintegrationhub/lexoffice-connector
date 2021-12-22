const nock = require('nock');

const createContactSuccessful = nock('https://api.lexoffice.io', {
  reqheaders: {
    Authorization: 'Bearer SuperDuperToken',
  },
})
  .post('/v1/contacts/')
  .reply(200, {
    id: '64cf1b44-77a7-4d62-83ab-086eda77322d',
    resourceUri: 'https://api.lexoffice.io/v1/contacts/64cf1b44-77a7-4d62-83ab-086eda77322d',
    createdDate: '2021-12-21T10:43:58.703+01:00',
    updatedDate: '2021-12-21T10:43:58.752+01:00',
    version: 1,
  });

const updateContactSuccessful = nock('https://api.lexoffice.io/v1/contacts/ba23c271-67e2-4bfe-bb99-02b4b28836c1', {
  reqheaders: {
    Authorization: 'Bearer SuperDuperToken',
  },
})
  .put('')
  .reply(200, {});


const createContactFailed = nock('https://api.lexoffice.io', {
  reqheaders: {
    Authorization: 'Bearer InvalidToken',
  },
})
  .post('/v1/contacts/')
  .reply(401, { message: 'Unauthorized' });


const checkExistingEntry = nock('https://api.lexoffice.io', {
  reqheaders: {
    Authorization: 'Bearer SuperDuperToken',
  },
})
  .get('/v1/contacts/ba23c271-67e2-4bfe-bb99-02b4b28836c1')
  .reply(200, { version: 2 });

module.exports = {
  createContactSuccessful,
  updateContactSuccessful,
  createContactFailed,
  checkExistingEntry,
};
