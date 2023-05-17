migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ku8emyx485vmbii")

  collection.indexes = [
    "CREATE INDEX `idx_PthAqWf` ON `brand` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ku8emyx485vmbii")

  collection.indexes = []

  return dao.saveCollection(collection)
})
