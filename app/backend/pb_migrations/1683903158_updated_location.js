migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v3izmcjondig1h7")

  collection.indexes = [
    "CREATE INDEX `idx_g1bxB9f` ON `location` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v3izmcjondig1h7")

  collection.indexes = []

  return dao.saveCollection(collection)
})
