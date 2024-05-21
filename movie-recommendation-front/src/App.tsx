import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header'; // Import the Header component
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import Navbar from './components/Navbar';
import './App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
        <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          {/*<Route path="/actor/:id" element={ActorDetails} />*/}
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
