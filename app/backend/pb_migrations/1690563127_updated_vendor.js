migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_JMV7kZ8` ON `vendor` (`vendor`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tqfrapfi",
    "name": "vendor",
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
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_JMV7kZ8` ON `vendor` (`name`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tqfrapfi",
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
})
