import { useMemo } from 'react'
import './palette.css'
import { PaletteItem } from '@/lib/types/useGetPublicPhotos'

const randomize = (min: number, max: number) => Math.random() * (max - min) + min

function Palette({ palette }: { palette: PaletteItem[] }) {
  const width = useMemo(() => {
    const totalPopulation = palette.reduce((total, current) => {
      return current?.population + total
    }, 0)

    return totalPopulation || 100
  }, [palette])

  const [first, ...swatches] = palette
  const positions = [
    { cx: 228, cy: 627, rx: 392, ry: 278, ar: 0.43 },
    { cx: 604, cy: 695, rx: 392, ry: 428, ar: 0.64 },
    { cx: 934, cy: 193, rx: 400, ry: 376, ar: 0.86 },
    { cx: 61, cy: 122, rx: 540, ry: 272, ar: 0.84 },
    { cx: 1226, cy: 803, rx: 538, ry: 382, ar: 0.85 },
  ]
  const mergedSwatches = swatches
    .map((item, i) => ({
      ...positions[i],
      population: item.population,
      rgb: item.rgb,
    }))
    .reverse()

  const generateSize = (population: number) => (population / width) * 10

  return (
    <div className="palette" style={{ backgroundColor: `oklch(from rgb(${first.rgb}) l c h)` }}>
      <svg
        width="100vw"
        height="100vh"
        viewBox="0 0 1440 1024"
        xmlns="http://www.w3.org/2000/svg"
        className="palette__svg"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g>
          {mergedSwatches.map((swatch, index) => (
            <g filter={`url(#filter${index}_f_1075_26)`} key={swatch.population}>
              <ellipse
                cx={swatch.cx}
                cy={swatch.cy}
                rx={swatch.rx * swatch.ar}
                ry={swatch.rx}
                style={{
                  scale: generateSize(swatch.population),
                  fill: `oklch(from rgb(${swatch.rgb}) l c h)`,
                  opacity: 0.9,
                }}
              >
                <animate
                  attributeName="cx"
                  values={`${swatch.cx};${swatch.cx * randomize(0.85, 1.25)};${swatch.cx}`}
                  dur="42s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${swatch.cy};${swatch.cy * randomize(0.85, 1.25)};${swatch.cy}`}
                  dur="37s"
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>
          ))}
        </g>
        <defs>
          {mergedSwatches.map((swatch, index) => (
            <filter
              id={`filter${index}_f_1075_26`}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
              key={swatch.cx}
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="120" result="effect1_foregroundBlur_1075_26" />
            </filter>
          ))}
        </defs>
      </svg>
    </div>
  )
}

export default Palette
