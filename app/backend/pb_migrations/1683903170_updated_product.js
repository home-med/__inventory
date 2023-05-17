migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cm7i6kur5d714of")

  collection.indexes = [
    "CREATE INDEX `idx_XjyI1WW` ON `product` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cm7i6kur5d714of")

  collection.indexes = []

  return dao.saveCollection(collection)
})
