migrate((db) => {
  const collection = new Collection({
    "id": "v3izmcjondig1h7",
    "created": "2023-05-12 14:51:17.525Z",
    "updated": "2023-05-12 14:51:17.525Z",
    "name": "location",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eh0sshnv",
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
        "id": "x3eiwdrq",
        "name": "active",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("v3izmcjondig1h7");

  return dao.deleteCollection(collection);
})
