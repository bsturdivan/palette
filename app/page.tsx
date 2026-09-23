import 'the-new-css-reset'
import styles from './page.module.css'
import { connectFlickr } from '@/lib/api/connectFlickr'
import { getUserInfo } from '@/lib/api/getUserInfo'
import { getPublicPhotos } from '@/lib/api/getPublicPhotos'
import { getPalette } from '@/lib/api/getPalette'
// import { PaletteReturnResponse } from '@/lib/types/useGetPublicPhotos'
import Palette from '@/components/palette'
import Header from '@/components/header'

export default async function Home() {
  const connection = connectFlickr()
  const { data: user } = await getUserInfo(connection)
  const { data: userImages } = await getPublicPhotos(connection, {
    user_id: user?.id || '',
    per_page: '36',
  })
  const { data } = await getPalette(userImages)

  return (
    <div className={styles.page}>
      <main className={styles.color}>
        <Palette palette={data} />
        <Header user={user} />
      </main>
    </div>
  )
}
