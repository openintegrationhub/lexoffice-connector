/* eslint "max-len":  ["error", { "code": 170 }] */
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

module.exports.contactToOih = (msg) => {
  if (Object.keys(msg).length === 0 && msg.constructor === Object) {
    return msg;
  }

  const contactData = [];
  const addresses = [];
  const categories = [];

  if (msg.data.emailAddresses) {
    // eslint-disable-next-line
    for (const key in msg.data.emailAddresses) {
      for (let i = 0; i < msg.data.emailAddresses[key].length; i += 1) {
        contactData.push({
          type: 'email',
          value: msg.data.emailAddresses[key][i],
          categories: [key],
        });
      }
    }
  }

  // phoneNumbers
  const phoneTypes = ['phone', 'mobile', 'fax'];
  if (msg.data.phoneNumbers) {
    // eslint-disable-next-line
    for (const key in msg.data.phoneNumbers) {
      for (let i = 0; i < msg.data.phoneNumbers[key].length; i += 1) {
        if (phoneTypes.contains(key)) {
          contactData.push({
            type: key,
            value: msg.data.emailAddresses[key][i],
            categories: [],
          });
        } else {
          contactData.push({
            type: 'phone',
            value: msg.data.emailAddresses[key][i],
            categories: [key],
          });
        }
      }
    }
  }

  // Addresses

  if (msg.data.addresses) {
    // eslint-disable-next-line
    for (const key in msg.data.addresses) {
      for (let i = 0; i < msg.data.addresses[key].length; i += 1) {
        const streetParts = msg.data.addresses[key].street.trim().split(' ');
        const streetNumber = streetParts.pop();

        contactData.push({
          street: streetParts.join(' '),
          streetNumber,
          unit: '',
          zipcode: `${msg.data.addresses[key].zip}`,
          city: `${msg.data.addresses[key].city}`,
          district: '',
          region: '',
          country: `${msg.data.addresses[key].countryCode}`,
          countryCode: `${msg.data.addresses[key].countryCode}`,
          primaryContact: '',
          description: `${msg.data.addresses[key].supplement}`,
          categories: [key],
        });
      }
    }
  }

  if (msg.data.roles) {
    if (msg.data.roles.customer.number) {
      contactData.push({
        type: 'custom',
        value: `customer_${msg.data.roles.customer.number}`,
      });
      categories.push('customer');
    }

    if (msg.data.roles.vendor.number) {
      contactData.push({
        type: 'custom',
        value: `vendor_${msg.data.roles.customer.number}`,
      });
      categories.push('vendor');
    }
  }

  if (msg.data.archived) {
    categories.push('archived');
  }

  const expression = {
    metadata: {
      recordUid: msg.data.id,
      applicationUid: 'lexoffice',
    },
    data: {},
  };

  if (msg.data.company) {
    expression.data = {
      name: `${msg.data.company.name}`,
      contactData,
      addresses,
      categories,
    };
  } else {
    expression.data = {
      firstName: `${msg.data.company.firstName}`,
      lastName: `${msg.data.company.lastName}`,
      // title: msg.data.title,
      // photo: msg.data.photo,
      // jobTitle: msg.data.jobTitle,
      salutation: `${msg.data.person.salutation}`,
      // gender: msg.data.gender,
      // birthday: msg.data.birthday,
      // displayName: msg.data.displayName,
      // middleName: msg.data.middleName,
      // nickname: msg.data.nickname,
      contactData,
      addresses,
      categories,
    };
  }

  // Remove null values
  Object.keys(expression.data).forEach(
    key => (expression.data[key] == null || expression.data[key] === undefined)
  && delete expression.data[key],
  );

  return expression;
};
