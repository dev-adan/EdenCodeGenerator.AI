'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import {Toaster} from 'react-hot-toast';

const Provider = ({children}) => {

    const [queryClient] = useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
              },
            },
          })
      );
    
    return <>
    <QueryClientProvider client={queryClient}>
        <Toaster position="top-center"/>
        {children}
    </QueryClientProvider>
    </>
}

export default Provider;