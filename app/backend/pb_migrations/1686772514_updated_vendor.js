migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy")

  collection.listRule = "archived = false"
  collection.viewRule = "archived = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fgjfqw7t9yi0shy")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
