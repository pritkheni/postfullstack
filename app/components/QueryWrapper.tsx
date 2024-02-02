'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "react-hot-toast"
export const QueryWrapper = ({children}:{children:ReactNode}) => {
    const queryClient = new QueryClient()
    return(
        <QueryClientProvider client={queryClient}>
            <Toaster/>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}