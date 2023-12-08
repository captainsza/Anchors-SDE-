import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
const EarningPage = React.lazy(() => import("pages/EarningPage"));
const Landingpage = React.lazy(() => import("pages/Landingpage"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
        <Route path="/" element={<Landingpage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/earningpage" element={<EarningPage />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
