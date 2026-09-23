import { Flickr } from 'flickr-sdk'
import { Data, ErrorException, ReturnResponse } from '../types/useGetInfo'

const INFO_METHOD = 'flickr.people.getInfo'
const USER_METHOD = 'flickr.people.findByUsername'

export async function getUserInfo(connection: Flickr): Promise<ReturnResponse> {
  let error: ErrorException = null
  let data: Data = null

  try {
    const usernameResponse = await connection(USER_METHOD, { username: 'bsturd' })

    if (usernameResponse.stat !== 'ok') {
      const message: string = usernameResponse.status
      throw new Error(message)
    }

    const {
      user: { id },
    } = usernameResponse

    const { person, stat, status } = await connection(INFO_METHOD, { user_id: id })

    if (stat !== 'ok') {
      const message: string = status
      throw new Error(message)
    }

    data = {
      id,
      username: person.username._content,
      name: person.realname._content,
      url: person.profileurl._content,
      iconfarm: person.iconfarm,
      iconserver: person.iconserver,
    }
  } catch (e) {
    error = { message: e }
  }

  return { error, data }
}
