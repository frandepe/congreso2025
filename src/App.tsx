import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="sync">
        <Routes>
          {/* Ruta SIN layout */}
          {/* <Route
            path="/vivo-patrocinadores"
            element={
              <PageWrapper>
                <Muestra />
              </PageWrapper>
            }
          /> */}

          {/* Rutas CON layout */}
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
    </BrowserRouter>
  );
}

export default App;
