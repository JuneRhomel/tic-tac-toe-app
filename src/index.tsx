import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './application/route/uppa.route';
import './application/css/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReduxStore from "./infrastructure/redux/store.redux";
import { Provider } from 'react-redux';
import ModalProvider from './application/provider/modal/modal.provider';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={ReduxStore}>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </Provider>
    </QueryClientProvider> 
  </React.StrictMode>
);

