/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "64s8fg5hu8ktgv7",
    "created": "2023-08-10 14:24:03.193Z",
    "updated": "2023-08-10 14:24:03.193Z",
    "name": "status",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yhhpneny",
        "name": "currentState",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "\"Idle\"",
            "\"Creating\"",
            "\"Updating\"",
            "\"Deleting\""
          ]
        }
      },
      {
        "system": false,
        "id": "sti8xjru",
        "name": "previousState",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "\"Idle\"",
            "\"Creating\"",
            "\"Updating\"",
            "\"Deleting\""
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("64s8fg5hu8ktgv7");

  return dao.deleteCollection(collection);
})
