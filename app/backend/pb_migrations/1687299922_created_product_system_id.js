migrate((db) => {
  const collection = new Collection({
    "id": "05ogz88ichtggvx",
    "created": "2023-06-20 22:25:22.290Z",
    "updated": "2023-06-20 22:25:22.290Z",
    "name": "product_system_id",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gyx7amoc",
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
        "id": "u0jghzaq",
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
        "id": "6gosle0l",
        "name": "system_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_WzH34KU` ON `product_system_id` (`system_id`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("05ogz88ichtggvx");

  return dao.deleteCollection(collection);
})
