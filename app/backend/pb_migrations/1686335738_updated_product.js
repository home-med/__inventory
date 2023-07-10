migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "irle1f5b",
    "name": "notes",
    "type": "text",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // remove
  collection.schema.removeField("irle1f5b")

  return dao.saveCollection(collection)
})
