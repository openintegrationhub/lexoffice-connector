/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

module.exports.contactFromOih = (msg) => {
  if (Object.keys(msg).length === 0 && msg.constructor === Object) {
    return msg;
  }

  const expression = {
    metadata: {
      operation: msg.operation,
      oihUid: msg.metadata.oihUid ? msg.metadata.oihUid : '',
      applicationUid: msg.metadata.applicationUid ? msg.metadata.applicationUid : '',
      iamToken: msg.metadata.iamToken ? msg.metadata.iamToken : undefined,
      recordUid: msg.metadata.recordUid,
    },
    data: {
      roles: {
        customer: {
        },
        vendor: {
        },
      },
      addresses: {
        billing: [
        ],
        shipping: [
        ],
      },
      emailAddresses: {
      },
      phoneNumbers: {
      },
      note: '',
    },
  };

  if (msg.metadata.recordUid) {
    expression.data.version = 1;
  } else {
    expression.data.version = 0;
  }

  if (msg.data.notes) {
    if (Array.isArray(msg.data.notes)) {
      expression.data.note = msg.data.notes.join('\n\n');
    } else {
      expression.data.note = `${msg.data.notes}`;
    }
  }

  if (msg.data.name) {
    expression.data.company = {
      name: msg.data.name,
      // taxNumber: '',
      // vatRegistrationId: '',
      // allowTaxFreeInvoices: true,
      contactPersons: [
        // {
        //   "salutation": "Herr",
        //   "firstName": "Max",
        //   "lastName": "Mustermann",
        //   "emailAddress": "contactpersonmail@lexoffice.de",
        //   "phoneNumber": "08000/11111"
        // }
      ],
    };
  } else {
    expression.data.person = {
      salutation: msg.data.salutation,
      firstName: msg.data.firstName,
      lastName: msg.data.lastName,
    };
  }

  if (msg.data.addresses) {
    const { length } = msg.data.addresses;

    for (let i = 0; i < length; i += 1) {
      let countryCode = 'DE';
      if (msg.data.addresses[i].countryCode) {
        countryCode = msg.data.addresses[i].countryCode; // eslint-disable-line
      }

      const address = {
        supplement: '',
        street: `${msg.data.addresses[i].street} ${msg.data.addresses[i].streetNumber}`,
        zip: `${msg.data.addresses[i].zipcode}`,
        city: `${msg.data.addresses[i].city}`,
        countryCode,
      };

      let found = false;
      if (msg.data.addresses[i].categories) {
        if (msg.data.addresses[i].categories.includes('billing')) {
          expression.data.addresses.billing.push(address);
          found = true;
        }

        if (msg.data.addresses[i].categories.includes('shipping')) {
          expression.data.addresses.shipping.push(address);
          found = true;
        }
      }

      if (!found) {
        expression.data.addresses.billing.push(address);
      }
    }
  }

  const phoneTypes = ['phone', 'mobile', 'fax'];
  if (msg.data.contactData) {
    const { length } = msg.data.contactData;
    for (let i = 0; i < length; i += 1) {
      let key = false;

      const currentType = msg.data.contactData[i].type;
      if (msg.data.contactData[i].categories) {
        if (msg.data.contactData[i].categories.includes('private')) {
          key = 'private';
        } else if (msg.data.contactData[i].categories.includes('business')) {
          key = 'business';
        } else if (msg.data.contactData[i].categories.includes('office')) {
          key = 'office';
        } else if (msg.data.contactData[i].categories.includes('other')) {
          key = 'other';
        }
      }

      if (key === false) {
        if (currentType === 'phone') {
          key = 'business';
        } else if (currentType === 'mobile') {
          key = 'mobile';
        } else if (currentType === 'fax') {
          key = 'fax';
        } else {
          key = 'business';
        }
      }

      let mainKey = false;
      if (phoneTypes.indexOf(currentType) > -1) {
        mainKey = 'phoneNumbers';
      } else if (currentType === 'email') {
        mainKey = 'emailAddresses';
      } else if (currentType === 'custom') {
        if (msg.data.contactData[i].value.indexOf('customer_') === 0) {
          const fragments = msg.data.contactData[i].value.split('_');
          expression.data.roles.customer.number = parseInt(fragments[1], 10);
        } else if (msg.data.contactData[i].value.indexOf('vendor_') === 0) {
          const fragments = msg.data.contactData[i].value.split('_');
          expression.data.roles.vendor.number = parseInt(fragments[1], 10);
        }
      }
      // else {
      //   // Other properties like website are not in the api response
      // }

      if (mainKey) {
        if (!(key in expression.data[mainKey])) expression.data[mainKey][key] = [];
        expression.data[mainKey][key].push(`${msg.data.contactData[i].value}`);
      }
    }
  }

  if (msg.data.categories && msg.data.categories.indexOf('archived') > -1) {
    expression.data.archived = true;
  }

  // Shorten some arrays as required by the api
  const keys = ['addresses', 'emailAddresses', 'phoneNumbers'];

  for (let i = 0; i < keys.length; i += 1) {
    // eslint-disable-next-line
    for (const key in expression.data[keys[i]]) {
      if (expression.data[keys[i]][key].length > 1) {
        expression.data[keys[i]][key] = expression.data[keys[i]][key].slice(0, 1);
      }
    }
  }

  if (
    expression.data.company
    && expression.data.company.contactPersons
    && expression.data.company.contactPersons.length > 1
  ) expression.data.company.contactPersons = expression.data.company.contactPersons.slice(0, 1);


  // Remove null values
  Object.keys(expression.data).forEach(
    key => (expression.data[key] == null || expression.data[key] === undefined)
  && delete expression.data[key],
  );

  return expression;
};
