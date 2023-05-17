migrate((db) => {
  const collection = new Collection({
    "id": "18jt0hf4ddhq7ye",
    "created": "2023-05-12 14:49:02.808Z",
    "updated": "2023-05-12 14:49:02.808Z",
    "name": "vendor",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ur4nzwqb",
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
        "id": "h9phfzzf",
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
  const collection = dao.findCollectionByNameOrId("18jt0hf4ddhq7ye");

  return dao.deleteCollection(collection);
})
