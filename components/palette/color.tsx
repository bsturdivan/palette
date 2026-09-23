function Color({ code, width }: { code: string; width: string }) {
  return <div className="palette__color" style={{ backgroundColor: code, width: width }} />
}

export default Color
