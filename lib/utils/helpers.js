/* eslint no-continue: "off" */
/* eslint no-await-in-loop: "off" */

const request = require('request-promise').defaults({ simple: false, resolveWithFullResponse: true });


/**
 * This method fetches contacts from lexoffice
 *
 * @param token - lexoffice token required for authentication
 * @param snapshot - current state of snapshot
 * @return {Object} - Array of contacts objects containing data
 */
async function getContacts(token, snapshot) {
  try {
    console.log('getContacts');
    console.log('Snapshot', snapshot);
    let entries = [];

    let maxPages = 1;
    for (let i = 0; i < maxPages; i += 1) {
      const options = {
        method: 'GET',
        uri: 'https://api.lexoffice.io/v1/contacts/',
        json: true,
        qs: {
          page: i,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await request.get(options);

      if (!result || !result.body || !result.body.content) {
        console.log('No results or an error occured');
        console.log(result.statusCode);
        console.log(result.text);
        return false;
      }
      maxPages = result.body.totalPages;
      entries = entries.concat(result.body.content);
    }

    if (!entries || !Array.isArray(entries)) {
      return 'Expected records array.';
    }
    return entries;
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * This method fetches contacts from lexoffice
 *
 * @param token - lexoffice token required for authentication
 * @param snapshot - current state of snapshot
 * @return {Object} - Array of contacts objects containing data
 */
async function upsertContact(token, entry) {
  try {
    console.log('upsertContacts');
    console.log('Entry', entry);

    const options = {
      method: 'POST',
      uri: 'https://api.lexoffice.io/v1/contacts/',
      json: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: entry.data,
    };

    if (entry.metadata.recordUid) {
      options.method = 'PUT';
      options.uri = `https://api.lexoffice.io/v1/contacts/${entry.metadata.recordUid}`;
    }

    const response = await request(options);

    if (response.statusCode !== 200) {
      console.log('Could not upsert object!');
      console.log('Body: ', JSON.stringify(options.body));
      console.log('Status: ', response.statusCode);
      console.log(JSON.stringify(response.body));
    }
    return response;
  } catch (e) {
    throw new Error(e);
  }
}


module.exports = {
  getContacts, upsertContact,
};
