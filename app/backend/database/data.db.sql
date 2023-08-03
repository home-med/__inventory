BEGIN TRANSACTION;
DROP TABLE IF EXISTS "_migrations";
CREATE TABLE IF NOT EXISTS "_migrations" (
	"file"	VARCHAR(255) NOT NULL,
	"applied"	INTEGER NOT NULL,
	PRIMARY KEY("file")
);
DROP TABLE IF EXISTS "_admins";
CREATE TABLE IF NOT EXISTS "_admins" (
	"id"	TEXT NOT NULL,
	"avatar"	INTEGER NOT NULL DEFAULT 0,
	"email"	TEXT NOT NULL UNIQUE,
	"tokenKey"	TEXT NOT NULL UNIQUE,
	"passwordHash"	TEXT NOT NULL,
	"lastResetSentAt"	TEXT NOT NULL,
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "_collections";
CREATE TABLE IF NOT EXISTS "_collections" (
	"id"	TEXT NOT NULL,
	"system"	BOOLEAN NOT NULL DEFAULT FALSE,
	"type"	TEXT NOT NULL DEFAULT base,
	"name"	TEXT NOT NULL UNIQUE,
	"schema"	JSON NOT NULL DEFAULT [],
	"indexes"	JSON NOT NULL DEFAULT [],
	"listRule"	TEXT DEFAULT NULL,
	"viewRule"	TEXT DEFAULT NULL,
	"createRule"	TEXT DEFAULT NULL,
	"updateRule"	TEXT DEFAULT NULL,
	"deleteRule"	TEXT DEFAULT NULL,
	"options"	JSON NOT NULL DEFAULT {},
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "_params";
CREATE TABLE IF NOT EXISTS "_params" (
	"id"	TEXT NOT NULL,
	"key"	TEXT NOT NULL UNIQUE,
	"value"	JSON DEFAULT NULL,
	"created"	TEXT NOT NULL,
	"updated"	TEXT NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "_externalAuths";
CREATE TABLE IF NOT EXISTS "_externalAuths" (
	"id"	TEXT NOT NULL,
	"collectionId"	TEXT NOT NULL,
	"recordId"	TEXT NOT NULL,
	"provider"	TEXT NOT NULL,
	"providerId"	TEXT NOT NULL,
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	FOREIGN KEY("collectionId") REFERENCES "_collections"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
	"avatar"	TEXT DEFAULT '',
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"email"	TEXT NOT NULL DEFAULT '',
	"emailVisibility"	BOOLEAN NOT NULL DEFAULT FALSE,
	"id"	TEXT NOT NULL DEFAULT ('r' || lower(hex(randomblob(7)))),
	"lastResetSentAt"	TEXT NOT NULL DEFAULT '',
	"lastVerificationSentAt"	TEXT NOT NULL DEFAULT '',
	"name"	TEXT DEFAULT '',
	"passwordHash"	TEXT NOT NULL,
	"tokenKey"	TEXT NOT NULL,
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"username"	TEXT NOT NULL,
	"verified"	BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "brand";
CREATE TABLE IF NOT EXISTS "brand" (
	"archived"	BOOLEAN DEFAULT FALSE,
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"id"	TEXT NOT NULL DEFAULT ('r' || lower(hex(randomblob(7)))),
	"name"	TEXT DEFAULT '',
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "vendor";
CREATE TABLE IF NOT EXISTS "vendor" (
	"archived"	BOOLEAN DEFAULT FALSE,
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"id"	TEXT NOT NULL DEFAULT ('r' || lower(hex(randomblob(7)))),
	"vendor"	TEXT DEFAULT '',
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"catalog"	TEXT DEFAULT '',
	"contact"	TEXT DEFAULT '',
	"fax"	TEXT DEFAULT '',
	"phone"	TEXT DEFAULT '',
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "product";
CREATE TABLE IF NOT EXISTS "product" (
	"archived"	BOOLEAN DEFAULT FALSE,
	"brand"	TEXT DEFAULT '',
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"custom_sku"	TEXT DEFAULT '',
	"ean"	TEXT DEFAULT '',
	"id"	TEXT NOT NULL DEFAULT ('r' || lower(hex(randomblob(7)))),
	"item"	TEXT DEFAULT '',
	"upc"	TEXT DEFAULT '',
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"vendor"	TEXT DEFAULT '',
	"manufact_sku"	TEXT DEFAULT '',
	"notes"	TEXT DEFAULT '',
	"system_id"	TEXT DEFAULT '',
	"visibility"	TEXT DEFAULT '',
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "location";
CREATE TABLE IF NOT EXISTS "location" (
	"archived"	BOOLEAN DEFAULT FALSE,
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"id"	TEXT NOT NULL DEFAULT ('r' || lower(hex(randomblob(7)))),
	"name"	TEXT DEFAULT '',
	"short_name"	TEXT DEFAULT '',
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "product_visibility";
CREATE TABLE IF NOT EXISTS "product_visibility" (
	"archived"	BOOLEAN DEFAULT FALSE,
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"eCom"	BOOLEAN DEFAULT FALSE,
	"id"	TEXT NOT NULL DEFAULT ('r' || lower(hex(randomblob(7)))),
	"location"	TEXT DEFAULT '',
	"item"	TEXT DEFAULT '',
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "product_system_id";
CREATE TABLE IF NOT EXISTS "product_system_id" (
	"created"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	"id"	TEXT NOT NULL DEFAULT ('r' || lower(hex(randomblob(7)))),
	"location"	TEXT DEFAULT '',
	"item"	TEXT DEFAULT '',
	"system_id"	TEXT DEFAULT '',
	"updated"	TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')),
	PRIMARY KEY("id")
);
DROP INDEX IF EXISTS "_externalAuths_record_provider_idx";
CREATE UNIQUE INDEX IF NOT EXISTS "_externalAuths_record_provider_idx" ON "_externalAuths" (
	"collectionId",
	"recordId",
	"provider"
);
DROP INDEX IF EXISTS "_externalAuths_provider_providerId_idx";
CREATE UNIQUE INDEX IF NOT EXISTS "_externalAuths_provider_providerId_idx" ON "_externalAuths" (
	"provider",
	"providerId"
);
DROP INDEX IF EXISTS "__pb_users_auth__username_idx";
CREATE UNIQUE INDEX IF NOT EXISTS "__pb_users_auth__username_idx" ON "users" (
	"username"
);
DROP INDEX IF EXISTS "__pb_users_auth__email_idx";
CREATE UNIQUE INDEX IF NOT EXISTS "__pb_users_auth__email_idx" ON "users" (
	"email"
) WHERE "email" != '';
DROP INDEX IF EXISTS "__pb_users_auth__tokenKey_idx";
CREATE UNIQUE INDEX IF NOT EXISTS "__pb_users_auth__tokenKey_idx" ON "users" (
	"tokenKey"
);
DROP INDEX IF EXISTS "idx_QhjiozJ";
CREATE UNIQUE INDEX IF NOT EXISTS "idx_QhjiozJ" ON "brand" (
	"name"
);
DROP INDEX IF EXISTS "idx_XV7xrsA";
CREATE UNIQUE INDEX IF NOT EXISTS "idx_XV7xrsA" ON "location" (
	"name"
);
DROP INDEX IF EXISTS "idx_vI9kb9g";
CREATE UNIQUE INDEX IF NOT EXISTS "idx_vI9kb9g" ON "product_visibility" (
	"item",
	"location"
);
DROP INDEX IF EXISTS "idx_JMV7kZ8";
CREATE UNIQUE INDEX IF NOT EXISTS "idx_JMV7kZ8" ON "vendor" (
	"vendor"
);
DROP INDEX IF EXISTS "idx_WzH34KU";
CREATE INDEX IF NOT EXISTS "idx_WzH34KU" ON "product_system_id" (
	"system_id"
);
DROP INDEX IF EXISTS "idx_o2rO9lG";
CREATE INDEX IF NOT EXISTS "idx_o2rO9lG" ON "product" (
	"manufact_sku",
	"custom_sku"
);
DROP INDEX IF EXISTS "idx_SbLnhrt";
CREATE INDEX IF NOT EXISTS "idx_SbLnhrt" ON "product" (
	"custom_sku"
);
DROP TRIGGER IF EXISTS "trg_delete_product_system_id_update_product";
CREATE TRIGGER trg_delete_product_system_id_update_product AFTER DELETE ON product_system_id
BEGIN
 	UPDATE product
 	SET system_id = (SELECT json_group_array(id) FROM product_system_id AS t1 WHERE item = product.id AND id != OLD.id GROUP BY item);
END;
DROP TRIGGER IF EXISTS "trg_delete_product_visibility_update_product";
CREATE TRIGGER trg_delete_product_visibility_update_product AFTER DELETE ON product_visibility
BEGIN
 	UPDATE product
	SET visibility = (SELECT json_group_array(id) FROM product_visibility WHERE item = product.id AND product_visibility.id != OLD.id GROUP BY item);
END;
DROP TRIGGER IF EXISTS "trg_insert_location_update_product_visibility";
CREATE TRIGGER trg_insert_location_update_product_visibility AFTER INSERT ON location
BEGIN
	INSERT INTO product_visibility (item, location, eCom, archived)
	SELECT id, NEW.id, false, false FROM product;
END;
DROP TRIGGER IF EXISTS "trg_insert_product_system_id_update_product";
CREATE TRIGGER trg_insert_product_system_id_update_product AFTER INSERT ON product_system_id
BEGIN
	UPDATE product
	SET system_id = (SELECT json_group_array(id) FROM product_system_id WHERE item = product.id GROUP BY item);
END;
DROP TRIGGER IF EXISTS "trg_insert_product_visibility_update_product";
CREATE TRIGGER trg_insert_product_visibility_update_product AFTER INSERT ON product_visibility
BEGIN
	UPDATE product
	SET visibility = (SELECT json_group_array(id) FROM product_visibility WHERE item = product.id GROUP BY item);
END;
COMMIT;
