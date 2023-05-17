migrate((db) => {
  const collection = new Collection({
    "id": "kt6mw0n6341bsai",
    "created": "2023-05-12 14:52:29.922Z",
    "updated": "2023-05-12 14:52:29.922Z",
    "name": "visibility",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8uffzvau",
        "name": "product",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "cm7i6kur5d714of",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "guxfqfib",
        "name": "location",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "v3izmcjondig1h7",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "b3a30pjd",
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
  const collection = dao.findCollectionByNameOrId("kt6mw0n6341bsai");

  return dao.deleteCollection(collection);
})
