/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // remove
  collection.schema.removeField("rylp44qz")

  // remove
  collection.schema.removeField("5rezwlfr")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rylp44qz",
    "name": "system_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "05ogz88ichtggvx",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "system_id",
        "item"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5rezwlfr",
    "name": "visibility",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "womgti1ltdirstt",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
