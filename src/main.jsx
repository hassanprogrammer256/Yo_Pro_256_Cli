import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './app/store.js'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
<StrictMode>
    <Provider store={store}>
            <Router>
                    <App />
                    <ToastContainer />
            </Router>
        </Provider>
</StrictMode>,
)
