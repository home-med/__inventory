migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("womgti1ltdirstt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6bemqsvq",
    "name": "archived",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("womgti1ltdirstt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6bemqsvq",
    "name": "active",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
