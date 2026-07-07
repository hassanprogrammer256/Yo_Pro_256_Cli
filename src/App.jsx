// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/common/header'
import AppRoutes from './routes/app_routes'
// import ProtectedRoute from './routes/protected_routes'
// import Home from './pages/home'

function App() {
  // const [count, setCount] = useState(0)

  return (
<>
<Header />
<AppRoutes />






{/* <ProtectedRoute>
<Home />
</ProtectedRoute> */}
</>
  )
}

export default App
