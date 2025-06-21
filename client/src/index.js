import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IndexRouters } from './router/index.routes';
import { SimpleRouter } from './router/simple-router.routes';
import reduxStore from "./redux";

const queryClient = new QueryClient();

const { store, persistor } = reduxStore();

const router = createBrowserRouter(
  [
    ...IndexRouters,
    ...SimpleRouter,
    //...ChatRouter
  ],
  { basename: process.env.PUBLIC_URL }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} >
            <App />
          </RouterProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);

