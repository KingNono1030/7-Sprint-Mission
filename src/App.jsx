import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Nav from './components/Nav';
import './styles/reset.css';
import './styles/global.css';

function App() {
  return (
    <HelmetProvider>
      <Nav />
      <Outlet />
    </HelmetProvider>
  );
}

export default App;
