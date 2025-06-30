import React from "react";

export default function WebVersionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Version Web
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Cette page est en cours de développement dans la nouvelle version Next.js.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700">
              La version web complète sera bientôt disponible ici.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 