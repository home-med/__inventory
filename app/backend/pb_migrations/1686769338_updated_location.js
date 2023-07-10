migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("216y102su3jrdtq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mjkblpew",
    "name": "archived",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("216y102su3jrdtq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mjkblpew",
    "name": "active",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
