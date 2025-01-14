import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import './css/index.css'
import App from './pages/App'
import OnBoarding from './pages/OnBoarding'
import Welcome from './pages/Welcome'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'
import Chat from './pages/Chat'

const PUBLISHABLE_KEY = 'pk_test_cHJvdmVuLWFpcmVkYWxlLTIyLmNsZXJrLmFjY291bnRzLmRldiQ'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/welcome" element={<Welcome />} />
                            <Route path="/trip" element={<OnBoarding />} />
                            <Route path="/agent" element={<Chat />} />
                        </Routes>
                    </ThemeProvider>
                </QueryClientProvider>
            </ClerkProvider>
        </BrowserRouter>
    </StrictMode>,
)