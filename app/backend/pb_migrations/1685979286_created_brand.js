migrate((db) => {
  const collection = new Collection({
    "id": "0ylq7leppc3ho9g",
    "created": "2023-06-05 15:34:46.277Z",
    "updated": "2023-06-05 15:34:46.277Z",
    "name": "brand",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6sjxk1lq",
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
        "id": "atvm7c18",
        "name": "active",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_QhjiozJ` ON `brand` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("0ylq7leppc3ho9g");

  return dao.deleteCollection(collection);
})
