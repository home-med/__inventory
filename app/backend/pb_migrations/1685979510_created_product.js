migrate((db) => {
  const collection = new Collection({
    "id": "92ayi6ky9a36f4y",
    "created": "2023-06-05 15:38:30.831Z",
    "updated": "2023-06-05 15:38:30.831Z",
    "name": "product",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xeipmlzd",
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
        "id": "wpozvgqo",
        "name": "upc",
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
        "id": "cxrjgwkh",
        "name": "ean",
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
        "id": "96mcit7b",
        "name": "custom_sku",
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
        "id": "8b6pels3",
        "name": "vendor",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "fgjfqw7t9yi0shy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "6az4opt3",
        "name": "brand",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "0ylq7leppc3ho9g",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "bnhzf6vc",
        "name": "active",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_o2rO9lG` ON `product` (`name`)",
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
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y");

  return dao.deleteCollection(collection);
})
