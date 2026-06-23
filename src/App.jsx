import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import DestinationPreview from './pages/DestinationPreview';
import TourPackagePage from './pages/TourPackagePage';
import BriefingPendingPage from './pages/BriefingPendingPage';
import JapanEGroupVisa from './pages/JapanEGroupVisa';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination/:slug" element={<DestinationPreview />} />
          <Route path="/preview/:slug" element={<DestinationPreview />} />
          <Route path="/tour-packages/:slug" element={<TourPackagePage />} />
          <Route path="/briefing-pending" element={<BriefingPendingPage />} />
          <Route path="/japan-egroup-visa" element={<JapanEGroupVisa />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;