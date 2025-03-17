import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { NavbarPrincipal } from "./components/Layout/NavbarPrincipal";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { MainLayout } from "./components/Layout/MainLayout";
import { Programa } from "./pages/Programa";

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
      {/* <NavbarPrincipal /> */}
      <MainLayout>
        <AnimatePresence mode="sync">
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
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />
            {/* <Route path="/jobs/guia-pellegrini" element={<GuiaPellegrini />} />
          <Route path="/jobs/guruia" element={<GuruiaProject />} />
          <Route path="/jobs/natura" element={<NaturaJob />} />
          <Route path="/jobs/ndcapacitaciones" element={<NDCapacitaciones />} />
          <Route path="/jobs/pilsen-digital" element={<PilsenDigital />} />
          <Route path="/practices/mil-opciones" element={<MilOpciones />} /> */}
          </Routes>
        </AnimatePresence>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
