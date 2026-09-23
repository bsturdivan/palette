import { createFlickr, Flickr } from 'flickr-sdk'
import { key } from '../constants'

export function connectFlickr(): Flickr {
  const { flickr } = createFlickr(key)
  return flickr
}
