migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x1ff0fay",
    "name": "catalog",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evh3cs1y",
    "name": "contact",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwiprffj",
    "name": "fax",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "25qhn89e",
    "name": "phone",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy")

  // remove
  collection.schema.removeField("x1ff0fay")

  // remove
  collection.schema.removeField("evh3cs1y")

  // remove
  collection.schema.removeField("gwiprffj")

  // remove
  collection.schema.removeField("25qhn89e")

  return dao.saveCollection(collection)
})
