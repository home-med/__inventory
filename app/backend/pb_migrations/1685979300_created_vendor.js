migrate((db) => {
  const collection = new Collection({
    "id": "fgjfqw7t9yi0shy",
    "created": "2023-06-05 15:35:00.165Z",
    "updated": "2023-06-05 15:35:00.165Z",
    "name": "vendor",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tqfrapfi",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "csoalmhn",
        "name": "active",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_JMV7kZ8` ON `vendor` (`name`)",
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy");

  return dao.deleteCollection(collection);
})
