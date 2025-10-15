import { useState, useEffect } from "react";

interface Tablet {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
}

const TabletViewer = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);

  // Load tablets from localStorage on component mount
  useEffect(() => {
    const savedTablets = localStorage.getItem("tablets");
    if (savedTablets) {
      try {
        setTablets(JSON.parse(savedTablets));
      } catch (e) {
        console.error("Failed to parse tablets from localStorage", e);
      }
    }
  }, []);

  // Update localStorage when tablets change
  useEffect(() => {
    localStorage.setItem("tablets", JSON.stringify(tablets));
  }, [tablets]);

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Tablets</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our collection of pharmaceutical tablets
          </p>
        </div>

        {tablets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No tablets available</h3>
            <p className="text-gray-500">Check back later for updates to our tablet inventory.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tablets.map((tablet) => (
              <div key={tablet.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tablet.name}</h3>
                      <p className="text-sm text-gray-500">{tablet.manufacturer}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      ${tablet.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {tablet.description || "No description available for this tablet."}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                      View Details
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabletViewer;