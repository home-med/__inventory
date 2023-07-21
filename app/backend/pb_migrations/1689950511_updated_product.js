migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // update
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
        "location",
        "system_id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // update
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
      "maxSelect": 1,
      "displayFields": [
        "system_id"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
