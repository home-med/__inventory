migrate((db) => {
  const collection = new Collection({
    "id": "womgti1ltdirstt",
    "created": "2023-06-05 15:40:18.267Z",
    "updated": "2023-06-05 15:40:18.267Z",
    "name": "product_visibility",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "stmzwhvb",
        "name": "product",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "92ayi6ky9a36f4y",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ar9chftz",
        "name": "location",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "216y102su3jrdtq",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "modubnqb",
        "name": "eCom",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "6bemqsvq",
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
  const collection = dao.findCollectionByNameOrId("womgti1ltdirstt");

  return dao.deleteCollection(collection);
})
