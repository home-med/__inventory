migrate((db) => {
  const collection = new Collection({
    "id": "cm7i6kur5d714of",
    "created": "2023-05-12 14:50:25.849Z",
    "updated": "2023-05-12 14:50:25.849Z",
    "name": "product",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "t0p91nsh",
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
        "id": "epviwqfo",
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
        "id": "ryz601sc",
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
        "id": "uf3fpv0j",
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
        "id": "zvdnhbut",
        "name": "manufact_sku",
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
        "id": "n19v1yr6",
        "name": "brand",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ku8emyx485vmbii",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "aca9njuu",
        "name": "vendor",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "18jt0hf4ddhq7ye",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "uv2m4eqb",
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
  const collection = dao.findCollectionByNameOrId("cm7i6kur5d714of");

  return dao.deleteCollection(collection);
})
