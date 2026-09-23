import { Palette } from '@vibrant/color'
import { Data, PaletteItem, PaletteReturnResponse } from '../types/useGetPublicPhotos'
import { Vibrant } from 'node-vibrant/node'

export async function getPalette(images: Data): Promise<PaletteReturnResponse> {
  let error: unknown = null
  let data: PaletteItem[] = []

  const processPalettes = (palettes: Palette[]) => {
    // First combine the palettes, keeping the highest population for each color
    const combined: Palette = palettes.reduce((max: Palette, current: Palette) => {
      if (!current) return max
      const temp: Palette = { ...current }
      Object.keys(max).forEach(item => {
        if (max[item] && current[item]) {
          temp[item] = max[item].population > current[item].population ? max[item] : current[item]
        }
      })
      return temp
    }, palettes[0])

    // Then sort by population in a single step
    return Object.values(combined)
      .filter((value): value is NonNullable<typeof value> => value !== null)
      .sort((a, b) => b.population - a.population)
  }

  const getVibrant = (images: Data) => {
    return Promise.all(images!.map(image => Vibrant.from(image.url).getPalette()))
  }

  try {
    const colors = await getVibrant(images)
    data = processPalettes(colors)
  } catch (e) {
    error = e
  }

  return { error, data }
}
