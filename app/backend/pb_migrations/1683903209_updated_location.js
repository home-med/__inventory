migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v3izmcjondig1h7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ogjhepxy",
    "name": "short_name",
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
  const collection = dao.findCollectionByNameOrId("v3izmcjondig1h7")

  // remove
  collection.schema.removeField("ogjhepxy")

  return dao.saveCollection(collection)
})
