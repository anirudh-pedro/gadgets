import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [gadgets, setGadgets] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.username);
    }

    fetch('http://localhost:3000/gadgets')
      .then(res => res.json())
      .then(data => setGadgets(data))
      .catch(err => console.error('Failed to load gadgets:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <nav className="w-full bg-white p-4 text-amber-900 flex justify-between items-center fixed">
        <h1 className="text-xl font-bold">Gadgets</h1>
        <div className="flex gap-4 items-center">
          <h1 className='text-xl'>Welcome, {username}</h1>
        </div>
        <button 
          className="bg-red-200 px-3 py-1 rounded hover:bg-red-300 transition"
          onClick={handleLogout}
        > 
          Logout
        </button>
      </nav>

      <div className="bg-amber-100 min-h-screen p-8">
        <h2 className="text-2xl font-semibold mb-6 text-amber-900 mt-10">All Gadgets</h2>

        {gadgets.length === 0 ? (
          <p>Loading gadgets...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gadgets.map((gadget) => (
              <div key={gadget._id} 
              onClick={() => navigate(`/gadget/${gadget._id}`)}
              className="cursor-pointer bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all" >

                <img src={gadget.imageUrl} alt={gadget.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="text-xl font-semibold">{gadget.name}</h3>
                <p className="text-gray-600 mb-2">{gadget.brand}</p>
                <p className="text-sm text-gray-700 line-clamp-3">{gadget.description}</p>
                <p className="mt-2 font-bold text-amber-800">₹{gadget.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


