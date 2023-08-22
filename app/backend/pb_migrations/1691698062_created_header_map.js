/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wcjgooo60zawibh",
    "created": "2023-08-10 20:07:42.430Z",
    "updated": "2023-08-10 20:07:42.430Z",
    "name": "header_map",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ymcacgvj",
        "name": "db_field_name",
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
        "id": "5fkx2ztl",
        "name": "csv_field_name",
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
      "CREATE UNIQUE INDEX `idx_HzJpI6q` ON `header_map` (\n  `db_field_name`,\n  `csv_field_name`\n)"
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
  const collection = dao.findCollectionByNameOrId("wcjgooo60zawibh");

  return dao.deleteCollection(collection);
})
