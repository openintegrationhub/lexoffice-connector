
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
      person: {
        salutation: 'Frau',
        firstName: 'Jane',
        lastName: 'Wayne',
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


const person = {
  notes: 0,
  isUser: false,
  firstName: 'Jane',
  lastName: 'Doe',
  photo: '',
  contactData: [{
    type: 'phone', value: '12345678', uid: '6buq1kvs908n9', categories: [],
  }, {
    type: 'email', value: 'some@one.de', uid: '6buq1kvs908na', categories: [],
  }],
  uid: '6buq1kvs908n8',
  gender: '',
  jobTitle: '',
  nickname: '',
  displayName: '',
  middleName: '',
  salutation: '',
  title: '',
  birthday: '',
  lastUpdate: 1636471715028,
  updateEvent: '6buq1kvs908o1',
  meta: {
    role: 'TENANT_ADMIN', user: '618a93a1c2f9cb0012d3d67c', tenant: '618a93a1c2f9cb0012d3d67b', username: 'some@some.com',
  },
  groups: [],
  addresses: [],
  categories: ['customer'],
  relations: [],
};


const organization = {
  notes: 0,
  name: 'Some GmbH',
  logo: '',
  addresses: [{
    street: 'Somestraße', streetNumber: '1', zipcode: '12345', city: 'Testcity', uid: '6buq1kvs908ne', categories: [],
  },
  {
    street: 'Somestraße', streetNumber: '2', zipcode: '12345', city: 'Testcity', uid: '6buq1kvs908nes',
  }],
  contactData: [{
    type: 'phone', value: '123456', uid: '6buq1kvs908ng', categories: [],
  }, {
    type: 'fax', value: '1234567', uid: '6buq1kvs908nh', categories: [],
  }, {
    type: 'email', value: 'info@some.com', uid: '6buq1kvs908ni', categories: [],
  },
  {
    type: 'fax', value: '007', uid: '6buq1kvs908nsh',
  }],
  uid: '6buq1kvs908nd',
  lastUpdate: 1636471715028,
  updateEvent: '6buq1kvs908o1',
  meta: {
    role: 'TENANT_ADMIN', user: '618a93a1c2f9cb0012d3d67c', tenant: '618a93a1c2f9cb0012d3d67b', username: 'some@some.com',
  },
  groups: [],
  categories: ['vendor'],
  relations: [],
};

module.exports = {
  contacts,
  person,
  organization,
};
