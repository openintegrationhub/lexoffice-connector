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

const {
  upsertContact,
} = require('./../utils/helpers');

const { contactFromOih } = require('../transformations/contactFromOih');
const { getToken } = require('./../utils/authentication');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param {Object} msg - incoming message object that contains ``body`` with payload
 * @param {Object} cfg - configuration that is account information and configuration field values
 */
async function processAction(msg, cfg) {
  try {
    const token = await getToken(cfg);

    const transformedMessage = transform(msg, cfg, contactFromOih);

    const oihUid = (transformedMessage.metadata) ? transformedMessage.metadata.oihUid : 'oihUid not set yet';
    const recordUid = (transformedMessage.metadata) ? transformedMessage.metadata.recordUid : null;
    const applicationUid = (transformedMessage.metadata) ? transformedMessage.metadata.applicationUid : null;

    /** Create an OIH meta object which is required
    * to make the Hub and Spoke architecture work properly
    */
    const newElement = {};
    const oihMeta = {
      applicationUid,
      oihUid,
      recordUid,
    };

    const response = await upsertContact(token, transformedMessage);

    newElement.metadata = oihMeta;

    if (response.body) {
      newElement.data = response.body;

      if (response.body.id) oihMeta.recordUid = response.body.id;
    }

    this.emit('data', newElement);
  } catch (e) {
    console.error('ERROR: ', e);
    console.log('Oops! Error occurred');
    this.emit('error', e);
  }
}

module.exports = {
  process: processAction,
};
