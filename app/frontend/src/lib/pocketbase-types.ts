/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Brand = "brand",
	Location = "location",
	Product = "product",
	ProductSystemId = "product_system_id",
	ProductVisibility = "product_visibility",
	Users = "users",
	Vendor = "vendor",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type BrandRecord = {
	name: string
	archived?: boolean
}

export type LocationRecord = {
	name: string
	short_name: string
	archived?: boolean
}

export type ProductRecord = {
	item: string
	upc?: string
	ean?: string
	manufact_sku?: string
	custom_sku?: string
	vendor?: RecordIdString
	brand?: RecordIdString
	visibility?: RecordIdString[]
	system_id?: RecordIdString
	notes?: string
	archived?: boolean
}

export type ProductSystemIdRecord = {
	product?: RecordIdString
	location?: RecordIdString
	system_id?: string
}

export type ProductVisibilityRecord = {
	item: RecordIdString
	location: RecordIdString
	eCom?: boolean
	archived?: boolean
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

export type VendorRecord = {
	vendor: string
	archived?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type BrandResponse = Required<BrandRecord> & BaseSystemFields
export type LocationResponse = Required<LocationRecord> & BaseSystemFields
export type ProductResponse<Texpand = unknown> = Required<ProductRecord> & BaseSystemFields<Texpand>
export type ProductSystemIdResponse<Texpand = unknown> = Required<ProductSystemIdRecord> & BaseSystemFields<Texpand>
export type ProductVisibilityResponse<Texpand = unknown> = Required<ProductVisibilityRecord> & BaseSystemFields<Texpand>
export type UsersResponse = Required<UsersRecord> & AuthSystemFields
export type VendorResponse = Required<VendorRecord> & BaseSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	brand: BrandRecord
	location: LocationRecord
	product: ProductRecord
	product_system_id: ProductSystemIdRecord
	product_visibility: ProductVisibilityRecord
	users: UsersRecord
	vendor: VendorRecord
}

export type CollectionResponses = {
	brand: BrandResponse
	location: LocationResponse
	product: ProductResponse
	product_system_id: ProductSystemIdResponse
	product_visibility: ProductVisibilityResponse
	users: UsersResponse
	vendor: VendorResponse
}
