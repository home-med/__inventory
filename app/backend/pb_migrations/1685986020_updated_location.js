migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("216y102su3jrdtq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ht4tbbuu",
    "name": "name",
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
  const collection = dao.findCollectionByNameOrId("216y102su3jrdtq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ht4tbbuu",
    "name": "name",
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
})
