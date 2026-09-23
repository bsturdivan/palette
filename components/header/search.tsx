import Camera from './Camera'
import './header.css'

function Search() {
  // const searchItem = useRef(null)

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const form = e.currentTarget
  //   const formData = new FormData(form)
  //   const username = formData.get('search') as string

  //   if (username) onSubmit(username)
  // }

  return (
    <form className="search">
      <input type="text" name="search" className="search__input" placeholder="Flickr username" />
      <button type="submit">
        <Camera />
      </button>
    </form>
  )
}

export default Search
