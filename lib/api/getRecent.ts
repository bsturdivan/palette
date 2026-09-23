import { key } from '../constants'
import { createFlickr } from 'flickr-sdk'
import { Data, ErrorException, Options, ReturnResponse } from '../types/useGetRecent'

const METHOD = 'flickr.photos.getRecent'

function getData(data: [{ id: string; title: string }]) {
  return data.map(item => ({
    photoId: item.id,
    title: item.title,
  }))
}

export async function getRecent(options: Options): Promise<ReturnResponse> {
  let data: Data = null
  let error: ErrorException = null

  const { flickr } = createFlickr(key)

  try {
    const response = await flickr(METHOD, options)

    if (response.stat !== 'ok') {
      const message: string = response.status
      throw new Error(message)
    }

    const {
      photos: { photo },
    } = response

    data = { items: getData(photo) }
  } catch (e) {
    error = { message: e }
  }

  return { error, data }
}
