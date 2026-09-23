import { FlickrPeopleGetPublicPhotosParams } from 'flickr-sdk'

type ImageSource = string | HTMLImageElement | Buffer
type PaletteItem = { population: number; hex: string; rgb: number[] }

interface DataItem {
  id?: string
  title?: string
  server?: string
  secret?: string
  url: ImageSource
}

interface ErrorResponse {
  message: string | unknown
}

type Data = DataItem[] | null
type ErrorException = ErrorResponse | null
type Options = FlickrPeopleGetPublicPhotosParams
type ReturnResponse = { data: Data; error: ErrorException }
type PaletteReturnResponse = { data: PaletteItem[]; error: unknown }

export type {
  Data,
  DataItem,
  Options,
  ErrorException,
  ReturnResponse,
  PaletteItem,
  PaletteReturnResponse,
}
