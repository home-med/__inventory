migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nwnrbnz4",
    "name": "manufact_sku",
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
  collection.schema.removeField("nwnrbnz4")

  return dao.saveCollection(collection)
})
