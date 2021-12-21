const nock = require('nock');

const getContactsSuccessful = nock('https://api.lexoffice.io', {
  reqheaders: {
    Authorization: 'Bearer SuperDuperToken',
  },
})
  .get('/v1/contacts/')
  .query({
    page: 0,
  })
  .reply(200, {
    content: [
      {
        id: '72b94d72-ead1-43ac-9753-236e7134a226',
        organizationId: '25d7fabe-aa30-4bb8-8ecc-1fbace2d8af7',
        version: 1,
        roles: {
          customer: {
            number: 10002,
          },
          vendor: {
            number: 70002,
          },
        },
        company: {
          name: 'DoAll AG',
          allowTaxFreeInvoices: false,
        },
        addresses: {
          billing: [
            {
              supplement: 'Rechnungen',
              street: 'Testroad 6',
              zip: '200',
              city: 'Testcity',
              countryCode: 'DE',
            },
          ],
          shipping: [
            {
              street: 'XY Strasse 1',
              zip: '2000',
              city: 'Testcity',
              countryCode: 'DE',
            },
          ],
        },
        emailAddresses: {
          business: [
            'mail@doall.ag',
          ],
        },
        phoneNumbers: {
          business: [
            '01901234567899',
          ],
          private: [
            '040123456',
          ],
        },
        archived: false,
      },
      {
        id: 'ba23c271-67e2-4bfe-bb99-02b4b28836c1',
        organizationId: '25d7fabe-aa30-4bb8-8ecc-1fbace2d8af7',
        version: 3,
        roles: {
          customer: {
            number: 10001,
          },
        },
        company: {
          name: 'Buy Mister',
          allowTaxFreeInvoices: false,
        },
        addresses: {
          billing: [
            {
              supplement: '2 Stock',
              street: 'Someroad 1',
              zip: '22763',
              city: 'Hamburg',
              countryCode: 'DE',
            },
          ],
        },
        archived: false,
      },
      {
        id: '9f33426d-2904-4344-9112-3de7c7d031a5',
        organizationId: '25d7fabe-aa30-4bb8-8ecc-1fbace2d8af7',
        version: 1,
        roles: {
          vendor: {
            number: 70001,
          },
        },
        company: {
          name: 'SellAll Ltd.',
          allowTaxFreeInvoices: false,
        },
        addresses: {
          billing: [
            {
              supplement: 'nix',
              street: 'Someother Rd. 3',
              zip: '1234',
              city: 'Somecity',
              countryCode: 'CR',
            },
          ],
        },
        archived: false,
      },
    ],
    first: true,
    last: true,
    totalPages: 1,
    totalElements: 3,
    numberOfElements: 3,
    size: 25,
    number: 0,
    sort: [
      {
        property: 'name',
        direction: 'ASC',
        ignoreCase: false,
        nullHandling: 'NATIVE',
        ascending: true,
      },
      {
        property: 'lastModifiedDate',
        direction: 'ASC',
        ignoreCase: false,
        nullHandling: 'NATIVE',
        ascending: true,
      },
      {
        property: 'contactId',
        direction: 'ASC',
        ignoreCase: false,
        nullHandling: 'NATIVE',
        ascending: true,
      },
    ],
  });

const getContactsNoAuth = nock('https://api.lexoffice.io', {
  reqheaders: {
    Authorization: 'Bearer InvalidToken',
  },
})
  .get('/v1/contacts/')
  .query({
    page: 0,
  })
  .reply(401, {
    message: 'Unauthorized',
  });

module.exports = {
  getContactsSuccessful,
  getContactsNoAuth,
};
