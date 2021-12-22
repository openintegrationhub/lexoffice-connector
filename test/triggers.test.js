/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { getContacts } = require('../lib/utils/helpers');
const {
  getContactsSuccessful,
  getContactsNoAuth,
} = require('./seed/triggers.seed');

const token = 'SuperDuperToken';
const invalidToken = 'InvalidToken';

describe('Triggers - getContacts', () => {
  before(async () => {
    getContactsSuccessful;
    getContactsNoAuth;
  });

  it('should get all Contacts', async () => {
    const snapshot = {
      lastUpdated: (new Date(0)).getTime(),
    };
    const contacts = await getContacts(token, snapshot);

    expect(contacts).to.be.a('array');
    expect(contacts).to.have.length(3);

    expect(contacts[0].roles).to.be.a('object');
    expect(contacts[0].roles.vendor).to.be.a('object');
    expect(contacts[0].roles.customer).to.be.a('object');

    expect(contacts[0].company).to.be.a('object');
    expect(contacts[0].company.name).to.equal('DoAll AG');

    expect(contacts[0].addresses).to.be.a('object');
    expect(contacts[0].addresses).to.not.be.empty;

    expect(contacts[0].emailAddresses).to.be.a('object');
    expect(contacts[0].emailAddresses).to.not.be.empty;

    expect(contacts[0].phoneNumbers).to.be.a('object');
    expect(contacts[0].phoneNumbers).to.not.be.empty;

    expect(contacts[1].person).to.be.a('object');
    expect(contacts[1].person.salutation).to.equal('Frau');
    expect(contacts[1].person.firstName).to.equal('Jane');
    expect(contacts[1].person.lastName).to.equal('Wayne');

    expect(contacts[1].roles).to.be.a('object');
    expect(contacts[1].roles.customer).to.be.a('object');

    expect(contacts[2].company).to.be.a('object');
    expect(contacts[2].company.name).to.equal('SellAll Ltd.');
    expect(contacts[2].roles).to.be.a('object');
    expect(contacts[2].roles.vendor).to.be.a('object');
  });

  it('should return 401 if auth is not correct', async () => {
    const snapshot = {
      lastUpdated: 0,
    };
    const contacts = await getContacts(invalidToken, snapshot);
    expect(contacts).to.equal(false);
  });
});
