/* eslint no-param-reassign: "off" */

/**
 * Copyright 2019 Wice GmbH

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

const { transform } = require('@openintegrationhub/ferryman');
const { getEntries } = require('./../utils/helpers');
const { getToken } = require('./../utils/authentication');
const { contactToOih } = require('../transformations/contactToOih');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param msg - incoming message object that contains ``body`` with payload
 * @param cfg - configuration that is account information and configuration field values
 * @param snapshot - saves the current state of integration step for the future reference
 */
async function processTrigger(msg, cfg, snapshot = {}) {
  try {
  // Authenticate and get the token from lexoffice
    const { applicationUid } = cfg;
    // const token = cfg.API_KEY;
    const token = await getToken(cfg);

    // Set the snapshot if it is not provided
    snapshot.lastUpdated = snapshot.lastUpdated || (new Date(0)).getTime();

    /** Create an OIH meta object which is required
    * to make the Hub and Spoke architecture work properly
    */
    const oihMeta = {
      applicationUid: applicationUid || 'lexoffice',
    };

    const entries = await getEntries(token, snapshot);

    console.log(`Found ${entries.result.length} records.`);

    if (entries.length > 0) {
      entries.forEach((element) => {
        const transformedElement = transform(element, cfg, contactToOih);
        transformedElement.metadata.applicationUid = oihMeta.applicationUid;
        // Emit the object with meta and data properties
        this.emit('data', transformedElement);
      });

      console.log(`New snapshot: ${snapshot.lastUpdated}`);
      this.emit('snapshot', snapshot);
    } else {
      this.emit('snapshot', snapshot);
    }
  } catch (e) {
    console.log(`ERROR: ${e}`);
    this.emit('error', e);
  }
}

module.exports = {
  process: processTrigger,
};
