migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("05ogz88ichtggvx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gyx7amoc",
    "name": "item",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "92ayi6ky9a36f4y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "item"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("05ogz88ichtggvx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gyx7amoc",
    "name": "product",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "92ayi6ky9a36f4y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "item"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
