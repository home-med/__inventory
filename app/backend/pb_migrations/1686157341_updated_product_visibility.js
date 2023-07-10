migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("womgti1ltdirstt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "stmzwhvb",
    "name": "item",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "92ayi6ky9a36f4y",
      "cascadeDelete": true,
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
  const collection = dao.findCollectionByNameOrId("womgti1ltdirstt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "stmzwhvb",
    "name": "item",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "92ayi6ky9a36f4y",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
