import Search from './search'
import './header.css'
import { Data } from '@/lib/types/useGetInfo'
import UserInfo from './userInfo'

function Header({
  // onSubmit,
  user,
}: // loading,
{
  // onSubmit: (arg0: string) => void
  user: Data
  // loading: boolean
}) {
  return (
    <header className="header">
      <UserInfo user={user} loading={false} />
      <Search />
    </header>
  )
}

export default Header
