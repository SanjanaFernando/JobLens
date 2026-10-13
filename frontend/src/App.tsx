import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Sidebar, MobileTabBar } from './components/Sidebar';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { JobsCatalogPage } from './pages/JobsCatalogPage';
import { ResumeUploadPage } from './pages/ResumeUploadPage';
import { ChatAssistantPage } from './pages/ChatAssistantPage';
import { ArchitectureDocsPage } from './pages/ArchitectureDocsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 seconds
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="min-h-screen bg-bg text-text flex flex-col font-body transition-colors duration-150">
              <Navbar />
              <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                {/* Main content padding: 16px mobile, 24px tablet, 32px desktop (Section 5) */}
                <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
                  <Routes>
                    {/* Public Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/architecture" element={<ArchitectureDocsPage />} />

                    {/* Protected User Workspace Routes */}
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <DashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/jobs"
                      element={
                        <ProtectedRoute>
                          <JobsCatalogPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/resume"
                      element={
                        <ProtectedRoute>
                          <ResumeUploadPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/chat"
                      element={
                        <ProtectedRoute>
                          <ChatAssistantPage />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
              </div>
              {/* Mobile bottom tab bar (Section 5) */}
              <MobileTabBar />
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
