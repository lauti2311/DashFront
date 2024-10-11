import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts'
import { Auth0ProviderWithNavigate } from './auth/Auth0ProvideWithNavigate.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Auth0ProviderWithNavigate>
           <Provider store={store}>
            <App /> 
          </Provider>
      </Auth0ProviderWithNavigate>
  </React.StrictMode>
);
