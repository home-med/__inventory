/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64s8fg5hu8ktgv7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yhhpneny",
    "name": "currentState",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Idle",
        "Creating",
        "Updating",
        "Deleting"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sti8xjru",
    "name": "previousState",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Idle",
        "Creating",
        "Updating",
        "Deleting"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64s8fg5hu8ktgv7")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
