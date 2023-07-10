migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8b6pels3",
    "name": "vendor",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "fgjfqw7t9yi0shy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8b6pels3",
    "name": "vendor",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "fgjfqw7t9yi0shy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
