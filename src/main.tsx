import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/AuthContext'
import App from './App.tsx'
import './index.css'

// Apply theme immediately to prevent flicker
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else if (savedTheme === 'light') {
  document.documentElement.classList.remove('dark');
} else if (savedTheme === 'system') {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', isDark);
}
createRoot(document.getElementById("root")!).render(
  <ThemeProvider 
    attribute="class" 
    defaultTheme={savedTheme} 
    enableSystem
    disableTransitionOnChange={false}
  >
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);
