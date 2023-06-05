migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("womgti1ltdirstt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "stmzwhvb",
    "name": "product",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "92ayi6ky9a36f4y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ar9chftz",
    "name": "location",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "216y102su3jrdtq",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
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
    "name": "product",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "92ayi6ky9a36f4y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ar9chftz",
    "name": "location",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "216y102su3jrdtq",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
