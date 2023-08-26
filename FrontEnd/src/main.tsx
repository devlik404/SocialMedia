import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './stores/rootReducer.ts';

const store = configureStore({
  reducer:rootReducer
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Router>
      <Provider store={store}>
      <App />
      </Provider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
)
