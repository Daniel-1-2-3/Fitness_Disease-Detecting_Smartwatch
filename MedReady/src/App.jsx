
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import ImgRec from './Pages/ImgRec';
import Footer from './Components/Footer';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 w-full min-h-screen text-gray-200 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 w-full h-16 flex items-center px-6">
          <nav className="flex gap-4">
            <NavLink to="/" end
              className="px-4 py-2 rounded-md active:bg-gray-700 active:text-white text-gray-400 hover:bg-gray-700"
            > Dashboard </NavLink>
            <NavLink to="/camera"
              className="px-4 py-2 rounded-md active:bg-gray-700 active:text-white text-gray-400 hover:bg-gray-700"
            > Camera </NavLink>
          </nav>
        </header>

        <main className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/camera" element={<ImgRec />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
};

export default App;
