migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("womgti1ltdirstt")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_vI9kb9g` ON `product_visibility` (\n  `product`,\n  `location`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("womgti1ltdirstt")

  collection.indexes = []

  return dao.saveCollection(collection)
})
