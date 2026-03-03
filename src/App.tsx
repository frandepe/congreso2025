import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { MainLayout } from "./components/Layout/MainLayout";
import { Programa } from "./pages/Programa";
import { UbicacionYAlojamiento } from "./pages/UbicacionYAlojamiento";
import { Patrocinadores } from "./pages/Patrocinadores";
import { Inscripcion } from "./pages/Inscripcion";
import { Expositores } from "./pages/Expositores";
import { FAQ } from "./pages/Faq";
import Videos from "./pages/Videos";
import Lives2025 from "./pages/Lives2025";
import SergioMarcos from "./pages/SergioMarcos";
import { ScrollToTop } from "./lib/ScrollTop";
import AboutSection from "./pages/About";
import ReactGA from "react-ga4";
import { getTitleForPath } from "./lib/getTitleForPath";
import { GA4Notice } from "./components/Toasts/GA4Notice";

function PageWrapper({ children }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  useEffect(() => {
    // Actualizamos el título dinámicamente
    document.title = getTitleForPath(location.pathname);

    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: document.title, // ahora cada página tiene su título
      // params: { test_mode: true },
    });
  }, [location.pathname]);

  // const [showLoader, setShowLoader] = useState(false);

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     setShowLoader(true);
  //     const timer = setTimeout(() => setShowLoader(false), 3000); // ⏱ Ajusta la duración
  //     return () => clearTimeout(timer);
  //   } else {
  //     setShowLoader(false);
  //   }
  // }, [location.pathname]);

  // if (showLoader) {
  //   return <PageLoader />; // 👈 Solo aparece en "/"
  // }

  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
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
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
      <GA4Notice />
    </BrowserRouter>
  );
}

export default App;
