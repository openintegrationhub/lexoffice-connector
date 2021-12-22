/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { upsertContact } = require('../lib/utils/helpers');

const {
  createContactSuccessful,
  updateContactSuccessful,
  upsertContactFailed,
  checkExistingEntry,
} = require('./seed/actions.seed');
const { contacts } = require('./seed/seed');

const token = 'SuperDuperToken';
const invalidToken = 'InvalidToken';


describe('Actions - upsertContact', () => {
  before(async () => {
    createContactSuccessful;
    updateContactSuccessful;
    upsertContactFailed;
    checkExistingEntry;
  });

  it('should create a contact', async () => {
    const contact = await upsertContact(token, contacts[0]);
    expect(contact).to.not.be.empty;
    expect(contact).to.be.a('object');
    expect(contact.statusCode).to.be.equal(200);
  });

  it('should update a contact', async () => {
    const contact = await upsertContact(token, contacts[1]);
    expect(contact).to.not.be.empty;
    expect(contact).to.be.a('object');
    expect(contact.statusCode).to.be.equal(200);
  });

  it('should return 401 if auth is invalid', async () => {
    const contact = await upsertContact(invalidToken, contacts[2]);
    expect(contact.statusCode).to.be.equal(401);
    expect(contact.body.message).to.equal('Unauthorized');
  });
});
