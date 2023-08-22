/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64s8fg5hu8ktgv7")

  // remove
  collection.schema.removeField("yhhpneny")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sc8542lc",
    "name": "currentState",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("64s8fg5hu8ktgv7")

  // add
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

  // remove
  collection.schema.removeField("sc8542lc")

  return dao.saveCollection(collection)
})
