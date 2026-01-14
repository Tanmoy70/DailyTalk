import { BrowserRouter, useLocation } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const AppContent = () => {
  const location = useLocation();
  const showLayout = location.pathname === '/';

  return (
    <>
      {showLayout && <Navbar />}
      <AppRoutes />
      {showLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;