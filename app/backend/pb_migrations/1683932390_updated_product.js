migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cm7i6kur5d714of")

  collection.updateRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cm7i6kur5d714of")

  collection.updateRule = ""

  return dao.saveCollection(collection)
})
