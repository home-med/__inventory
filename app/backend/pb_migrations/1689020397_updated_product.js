migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5rezwlfr",
    "name": "visibility",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "womgti1ltdirstt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "location"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5rezwlfr",
    "name": "visibility",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "womgti1ltdirstt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
