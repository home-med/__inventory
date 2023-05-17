migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("18jt0hf4ddhq7ye")

  collection.indexes = [
    "CREATE INDEX `idx_QEKyvxL` ON `vendor` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("18jt0hf4ddhq7ye")

  collection.indexes = []

  return dao.saveCollection(collection)
})
