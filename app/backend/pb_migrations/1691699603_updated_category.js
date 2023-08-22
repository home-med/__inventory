/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jmu4qspcergx2kf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ipzzgxdy",
    "name": "parentID",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "jmu4qspcergx2kf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hz3rqfwt",
    "name": "description",
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
  const collection = dao.findCollectionByNameOrId("jmu4qspcergx2kf")

  // remove
  collection.schema.removeField("ipzzgxdy")

  // remove
  collection.schema.removeField("hz3rqfwt")

  return dao.saveCollection(collection)
})
