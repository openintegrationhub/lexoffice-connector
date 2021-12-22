/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { contactFromOih } = require('../lib/transformations/contactFromOih');
const { contactToOih } = require('../lib/transformations/contactToOih');

const {
  contacts,
  person,
  organization,
} = require('./seed/seed');

describe('Transformations', () => {
  before(async () => {
  });

  it('should transform to contact from oih person', async () => {
    const msg = {
      metadata: {
        applicationUid: 'Snazzy',
        recordUid: '007',
      },
      data: person,
    };
    const result = await contactFromOih(msg);

    expect(result).to.be.an('object');
    expect(result.metadata).to.be.an('object');
    expect(result.data).to.be.an('object');

    expect(result.metadata.applicationUid).to.equal('Snazzy');
    expect(result.metadata.recordUid).to.equal('007');

    expect(result.data.person).to.be.an('object');
    expect(result.data.person.firstName).to.equal('Jane');
    expect(result.data.person.lastName).to.equal('Doe');

    expect(result.data.emailAddresses.business[0]).to.equal('some@one.de');

    expect(result.data.phoneNumbers.business[0]).to.equal('12345678');
  });


  it('should transform to contact from oih organization', async () => {
    const msg = {
      metadata: {
        applicationUid: 'Snazzy',
        recordUid: '007',
      },
      data: organization,
    };
    const result = await contactFromOih(msg);

    expect(result).to.be.an('object');
    expect(result.metadata).to.be.an('object');
    expect(result.data).to.be.an('object');

    expect(result.metadata.applicationUid).to.equal('Snazzy');
    expect(result.metadata.recordUid).to.equal('007');

    expect(result.data.company).to.be.an('object');
    expect(result.data.company.name).to.equal('Some GmbH');

    expect(result.data.addresses.billing[0].street).to.equal('Somestraße 1');
    expect(result.data.addresses.billing[0].zip).to.equal('12345');
    expect(result.data.addresses.billing[0].city).to.equal('Testcity');
    expect(result.data.addresses.billing[0].countryCode).to.equal('DE');

    expect(result.data.emailAddresses.business[0]).to.equal('info@some.com');

    expect(result.data.phoneNumbers.business[0]).to.equal('123456');
    expect(result.data.phoneNumbers.fax[0]).to.equal('1234567');
  });


  it('should transform a lexoffice contact to oih person', async () => {
    const msg = {
      metadata: {
        applicationUid: 'Snazzy',
        // recordUid: '007',
      },
      data: contacts[1].data,
    };

    msg.data.id = '007';

    const result = await contactToOih(msg);

    expect(result).to.be.an('object');
    expect(result.metadata).to.be.an('object');
    expect(result.data).to.be.an('object');

    expect(result.metadata.applicationUid).to.equal('lexoffice');
    expect(result.metadata.recordUid).to.equal('007');

    expect(result.data.salutation).to.equal('Frau');
    expect(result.data.firstName).to.equal('Jane');
    expect(result.data.lastName).to.equal('Wayne');

    expect(result.data.contactData[0].type).to.equal('email');
    expect(result.data.contactData[0].value).to.equal('mail@doall.ag');
    // expect(result.data.contactData[0].categories[0]).to.equal('business');

    expect(result.data.contactData[1].type).to.equal('phone');
    expect(result.data.contactData[1].value).to.equal('01901234567899');
    // expect(result.data.contactData[1].categories[0]).to.equal('business');

    expect(result.data.contactData[2].type).to.equal('phone');
    expect(result.data.contactData[2].value).to.equal('040123456');
    // expect(result.data.contactData[2].categories[0]).to.equal('private');

    expect(result.data.contactData[3].type).to.equal('custom');
    expect(result.data.contactData[3].value).to.equal('customer_10001');

    expect(result.data.addresses[0].street).to.equal('Someroad');
    expect(result.data.addresses[0].streetNumber).to.equal('1');
    expect(result.data.addresses[0].zipcode).to.equal('22763');
    expect(result.data.addresses[0].city).to.equal('Hamburg');
    expect(result.data.addresses[0].country).to.equal('DE');
    expect(result.data.addresses[0].description).to.equal('2 Stock');
    // expect(result.data.addresses[0].categories[0]).to.equal('billing');

    expect(result.data.categories[0]).to.equal('customer');
  });

  it('should transform a lexoffice contact to oih organization', async () => {
    const msg = {
      metadata: {
        applicationUid: 'Snazzy',
        // recordUid: '007',
      },
      data: contacts[0].data,
    };

    msg.data.id = '007';

    const result = await contactToOih(msg);

    expect(result).to.be.an('object');
    expect(result.metadata).to.be.an('object');
    expect(result.data).to.be.an('object');

    expect(result.metadata.applicationUid).to.equal('lexoffice');
    expect(result.metadata.recordUid).to.equal('007');

    expect(result.data.name).to.equal('DoAll AG');

    expect(result.data.contactData[0].type).to.equal('email');
    expect(result.data.contactData[0].value).to.equal('mail@doall.ag');
    // expect(result.data.contactData[0].categories[0]).to.equal('business');

    expect(result.data.contactData[1].type).to.equal('phone');
    expect(result.data.contactData[1].value).to.equal('01901234567899');
    // expect(result.data.contactData[1].categories[0]).to.equal('business');

    expect(result.data.contactData[2].type).to.equal('phone');
    expect(result.data.contactData[2].value).to.equal('040123456');
    // expect(result.data.contactData[2].categories[0]).to.equal('private');

    expect(result.data.addresses[0].street).to.equal('Testroad');
    expect(result.data.addresses[0].streetNumber).to.equal('6');
    expect(result.data.addresses[0].zipcode).to.equal('200');
    expect(result.data.addresses[0].city).to.equal('Testcity');
    expect(result.data.addresses[0].country).to.equal('DE');
    // expect(result.data.addresses[0].categories[0]).to.equal('billing');

    expect(result.data.categories[0]).to.equal('customer');
    expect(result.data.categories[1]).to.equal('vendor');
  });
});
