migrate((db) => {
  const collection = new Collection({
    "id": "ku8emyx485vmbii",
    "created": "2023-05-12 14:48:51.836Z",
    "updated": "2023-05-12 14:48:51.836Z",
    "name": "brand",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b8cbutss",
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
        "id": "5541f8tn",
        "name": "active",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ku8emyx485vmbii");

  return dao.deleteCollection(collection);
})
