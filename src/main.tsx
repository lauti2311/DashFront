import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts'
import { AuthProvider } from './components/Login/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
           <Provider store={store}>
           <AuthProvider>
            <App /> 
            </AuthProvider>
          </Provider>
  </React.StrictMode>
);
