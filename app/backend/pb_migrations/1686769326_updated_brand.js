migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ylq7leppc3ho9g")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "atvm7c18",
    "name": "archived",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ylq7leppc3ho9g")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "atvm7c18",
    "name": "active",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
