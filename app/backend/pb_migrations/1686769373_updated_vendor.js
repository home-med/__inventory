migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csoalmhn",
    "name": "archived",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csoalmhn",
    "name": "active",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
