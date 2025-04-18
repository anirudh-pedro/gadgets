import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GadgetDetail = () => {
  const { id } = useParams();
  const [gadget, setGadget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/gadgets/${id}`)
      .then(res => res.json())
      .then(data => setGadget(data))
      .catch(err => console.error('Failed to load gadget:', err));
  }, [id]);

  if (!gadget) return <div className="p-8">Loading gadget details...</div>;

  return (
    <div className="p-8 bg-amber-100 min-h-screen">
      

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-amber-700 underline cursor-pointer">← Back</button>
        <div className="flex flex-col md:flex-row gap-6">
          <img src={gadget.imageUrl} alt={gadget.name} className="w-full md:w-1/2 h-80 object-cover rounded-lg" />

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">{gadget.name}</h2>
            <p className="text-xl text-gray-700 mb-2">Brand: <span className="font-semibold">{gadget.brand}</span></p>
            <p className="text-gray-800 mb-4">{gadget.description}</p>

            <p className="text-lg font-semibold text-amber-800 mb-2">Price: ₹{gadget.price}</p>
            <p className="text-md text-gray-700 mb-2">Category: {gadget.category}</p>
            <p className="text-md text-gray-700 mb-2">Rating: ⭐ {gadget.rating}</p>
            <p className="text-md text-gray-700 mb-2">Release Date: {gadget.releaseDate}</p>
            <p className={`text-md font-medium ${gadget.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {gadget.inStock ? 'In Stock' : 'Out of Stock'}
            </p>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside text-gray-700">
                {gadget.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Specifications:</h4>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Display:</strong> {gadget.specs.display}</li>
                <li><strong>Processor:</strong> {gadget.specs.processor}</li>
                <li><strong>Storage:</strong> {gadget.specs.storageOptions.join(', ')}</li>
                <li><strong>Battery:</strong> {gadget.specs.battery}</li>
                <li><strong>OS:</strong> {gadget.specs.os}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GadgetDetail;
