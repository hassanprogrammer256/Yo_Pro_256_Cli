import {useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { user_data } from '../../features/authSlice'

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
dispatch(user_data())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-hassan-gray/20 flex">
      <div className="flex-1 flex flex-col min-h-screen mt-24  md:mt-20">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout