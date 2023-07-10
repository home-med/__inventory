migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_o2rO9lG` ON `product` (`manufact_sku`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92ayi6ky9a36f4y")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_o2rO9lG` ON `product` (`item`)"
  ]

  return dao.saveCollection(collection)
})
