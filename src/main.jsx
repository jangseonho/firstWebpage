import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

// QueryClient 객체 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 3
    }
  }
});

// mui 스타일
const theme = createTheme({
  // 본인이 원하는 서체에 따라서 이건 들어갈 수 도 있고 안들어갈 수 도 있음
  typography: {
    fontFamily: ["Pretendard", "-apple - system", "BlinkMacSystemFont", "system - ui", "Roboto", "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "sans - serif"].join(',')
  }
})

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>
)
