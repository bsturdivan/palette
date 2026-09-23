import { Flickr } from 'flickr-sdk'
import {
  Data,
  DataItem,
  ErrorException,
  Options,
  ReturnResponse,
} from '../types/useGetPublicPhotos'

function getData(data: [DataItem]) {
  return data.map(item => ({
    title: item.title,
    url: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`,
  }))
}

export async function getPublicPhotos(
  connection: Flickr,
  options: Options,
): Promise<ReturnResponse> {
  let data: Data = null
  let error: ErrorException = null

  const METHOD = options.user_id ? 'flickr.people.getPublicPhotos' : 'flickr.photos.getRecent'

  try {
    const response = await connection(METHOD, options)

    if (response.stat !== 'ok') {
      const message: string = response.status
      throw new Error(message)
    }

    const {
      photos: { photo },
    } = response

    data = getData(photo)
  } catch (e) {
    error = { message: e }
  }

  return { error, data }
}
