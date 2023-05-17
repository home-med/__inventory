export type Option = {
  text: string
  short?: string
  value: string
}

interface IPocketBase {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: Generic<T>[]
  expand: Generic<T>[]
}

interface IBase {
  collectionId: string
  collectionName: string
  id: string
  created: Date
  updated: Date
}


export type TProduct = {
  name: string
  active: boolean
  upc: number
  ean: number
  custom_sku: string
  manufact_sku: string
  brand: string
  vendor: string
} & IBase

export type TVisibility = {
  product: string
  location: string
  active: boolean
} & IBase

export type TLocation = {
  name: string
  short_name: string
  active: boolean
} & IBase

export type TBrand = {
  name: string
  active: boolean
} & IBase

export type TVendor = {
  name: string
  active: boolean
} & IBase
