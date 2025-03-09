import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/pages/Dashboard";
import PanelControl from "@/pages/PanelControl";
import Categorias from "@/pages/Categorias";
import Productos from "@/pages/Productos";
import Caja from "@/pages/Caja";
import Proveedores from "@/pages/Proveedores";
import Venta from "@/pages/Venta";
import Settings from "@/pages/modal_profile/Settings";
import Profile from "@/pages/modal_profile/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-[174px]">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="pt-16 px-4 md:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/panel-control"
            element={
              <Layout>
                <PanelControl />
              </Layout>
            }
          />
          <Route
            path="/categorias"
            element={
              <Layout>
                <Categorias />
              </Layout>
            }
          />
          <Route
            path="/productos"
            element={
              <Layout>
                <Productos />
              </Layout>
            }
          />
          <Route
            path="/caja"
            element={
              <Layout>
                <Caja />
              </Layout>
            }
          />
          <Route
            path="/proveedores"
            element={
              <Layout>
                <Proveedores />
              </Layout>
            }
          />
          <Route
            path="/venta"
            element={
              <Layout>
                <Venta />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
