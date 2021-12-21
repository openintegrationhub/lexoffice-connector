# lexoffice-connector



This **adapter** connects [lexoffice](https://lexoffice.com) with third-party applications. With this **adapter** you are able to create different application flows. It supports **"Triggers"** (e.g. ``getContacts``) as well as **"Actions"** (e.g. ``upsertContact``), therefore with this **adapter** you could both read and fetch data from lexoffice and write and save data in lexoffice.


> Any attempt to reach [lexoffice](https://lexoffice.com) endpoints without registration will not be successful!

## Authorization
Each request to lexoffice API requires an authorization. To do so you need to pass the generated `key` through the config.


## Actions and triggers
The **adapter** supports the following **actions** and **triggers**:

#### Triggers:
  - Get contacts - polling (```getContactsPolling.js```)

  All triggers are of type '*polling'* which means that the **trigger** can be scheduled to execute periodically. At the end the entire object should be emitted as the message body. It is recommended to only use this trigger for the first sync. Because for receiving changes the provider also offers an webhook functionality.

#### Actions:
  - Upsert contact (```upsertContact.js```)

  The Upsert contact action updates an existing contact if it already exists. Otherwise it creates a new one.


## Integrated Transformations

Transformations to and from the OIH contact master data model are integrated into the relevant actions/triggers by default. This means that it is not necessary to run a separate lexoffice Transformer in flows containing this Adapter.

If you would like to use the old behaviour without integrated transformations, simply set `skipTransformation: true` in the `fields` object of your flow configuration. Alternatively, you can also inject a valid, stringified JSONata expression in the `customMapping` key of the `fields` object, which will be used instead of the integrated transformation.

## License

Apache-2.0 © [Wice GmbH](https://wice.de/)
