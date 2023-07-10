migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rylp44qz",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "05ogz88ichtggvx",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // remove
  collection.schema.removeField("rylp44qz")

  return dao.saveCollection(collection)
})
