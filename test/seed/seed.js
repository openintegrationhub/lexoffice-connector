
const contacts = [
  {
    metadata: {
    },
    data: {
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
  },
  {
    metadata: {
      recordUid: 'ba23c271-67e2-4bfe-bb99-02b4b28836c1',
    },
    data: {
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
  },
  {
    metadata: {
    },
    data: {
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
  },
];


module.exports = {
  contacts,
};
