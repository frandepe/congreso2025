import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactGA from "react-ga4";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Home } from "@/pages/Home";
import { Contact } from "@/pages/Contact";
import { Programa } from "@/pages/Programa";
import { UbicacionYAlojamiento } from "@/pages/UbicacionYAlojamiento";
import { Patrocinadores } from "@/pages/Patrocinadores";
import { Inscripcion } from "@/pages/Inscripcion";
import { Expositores } from "@/pages/Expositores";
import { FAQ } from "@/pages/Faq";
import Videos from "@/pages/Videos";
import Lives2025 from "@/pages/Lives2025";
import SergioMarcos from "@/pages/SergioMarcos";
import AboutSection from "@/pages/About";
import { ScrollToTop } from "@/lib/ScrollTop";
import { getTitleForPath } from "@/lib/getTitleForPath";
import { PublicRegistrationPage } from "@/features/public-registration/pages/PublicRegistrationPage";
import { PublicSecondInstallmentPage } from "@/features/public-registration/pages/PublicSecondInstallmentPage";
import { AdminLoginPage } from "@/features/auth/pages/AdminLoginPage";
import { AdminShell } from "@/features/admin-submissions/pages/AdminShell";
import { AdminSubmissionsPage } from "@/features/admin-submissions/pages/AdminSubmissionsPage";
import { AdminSubmissionDetailPage } from "@/features/admin-submissions/pages/AdminSubmissionDetailPage";
import { RequireAdminAuth } from "@/features/auth/RequireAdminAuth";

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function DocumentRouteEffects() {
  const location = useLocation();

  useEffect(() => {
    document.title = getTitleForPath(location.pathname);

    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: document.title,
    });
  }, [location.pathname]);

  return null;
}

function PublicLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <DocumentRouteEffects />
      <AnimatePresence mode="sync">
        <Routes location={location} key={location.pathname}>
          <Route element={<PublicLayout />}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/programa"
              element={
                <PageWrapper>
                  <Programa />
                </PageWrapper>
              }
            />
            <Route
              path="/ubicacion-y-alojamiento"
              element={
                <PageWrapper>
                  <UbicacionYAlojamiento />
                </PageWrapper>
              }
            />
            <Route
              path="/inscripcion"
              element={
                <PageWrapper>
                  <Inscripcion />
                </PageWrapper>
              }
            />
            <Route
              path="/inscripcion/segunda-cuota"
              element={
                <PageWrapper>
                  <PublicSecondInstallmentPage />
                </PageWrapper>
              }
            />
            <Route
              path="/inscripcion/participantes"
              element={
                <PageWrapper>
                  <PublicRegistrationPage />
                </PageWrapper>
              }
            />
            <Route
              path="/inscripcion-test"
              element={
                <Navigate to="/inscripcion/participantes" replace />
              }
            />
            <Route
              path="/sobre-nosotros"
              element={
                <PageWrapper>
                  <AboutSection />
                </PageWrapper>
              }
            />
            <Route
              path="/patrocinadores"
              element={
                <PageWrapper>
                  <Patrocinadores />
                </PageWrapper>
              }
            />
            <Route
              path="/preguntas-frecuentes"
              element={
                <PageWrapper>
                  <FAQ />
                </PageWrapper>
              }
            />
            <Route
              path="/videos"
              element={
                <PageWrapper>
                  <Videos />
                </PageWrapper>
              }
            />
            <Route
              path="/vivo-2025"
              element={
                <PageWrapper>
                  <Lives2025 />
                </PageWrapper>
              }
            />
            <Route
              path="/expositores"
              element={
                <PageWrapper>
                  <Expositores />
                </PageWrapper>
              }
            />
            <Route
              path="/homenaje-sergio-marcos"
              element={
                <PageWrapper>
                  <SergioMarcos />
                </PageWrapper>
              }
            />
            <Route
              path="/contacto"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />
          </Route>

          <Route
            path="/admin/login"
            element={
              <PageWrapper>
                <AdminLoginPage />
              </PageWrapper>
            }
          />

          <Route element={<RequireAdminAuth />}>
            <Route path="/admin" element={<AdminShell />}>
              <Route
                index
                element={
                  <PageWrapper>
                    <AdminSubmissionsPage />
                  </PageWrapper>
                }
              />
              <Route
                path="submissions/:id"
                element={
                  <PageWrapper>
                    <AdminSubmissionDetailPage />
                  </PageWrapper>
                }
              />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
