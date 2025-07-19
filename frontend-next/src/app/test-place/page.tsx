import Link from 'next/link';

export default function TestPlacePage() {
  const testPlaces = [
    { code: '75056', nom: 'Paris' },
    { code: '13055', nom: 'Marseille' },
    { code: '69123', nom: 'Lyon' },
    { code: '31555', nom: 'Toulouse' },
    { code: '06088', nom: 'Nice' },
    { code: '44109', nom: 'Nantes' },
    { code: '34172', nom: 'Montpellier' },
    { code: '67482', nom: 'Strasbourg' },
    { code: '11262', nom: 'Narbonne' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test des pages de lieu
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Pages de lieu disponibles :</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testPlaces.map((place) => (
              <div key={place.code} className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{place.nom}</h3>
                <p className="text-sm text-gray-600 mb-3">Code INSEE: {place.code}</p>
                <div className="space-y-2">
                  <Link 
                    href={`/place/${place.code}/${place.nom.toLowerCase().replace(/\s+/g, '-')}/`}
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Page normale
                  </Link>
                  <Link 
                    href={`/place/${place.code}/${place.nom.toLowerCase().replace(/\s+/g, '-')}/?iframe=true`}
                    className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Mode iframe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold mb-4">Instructions de test :</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Cliquez sur "Page normale" pour voir la page complète avec le contenu supplémentaire</li>
            <li>Cliquez sur "Mode iframe" pour voir la page en mode iframe (contenu minimal)</li>
            <li>Vérifiez que les indicateurs se chargent correctement</li>
            <li>Vérifiez que le bouton d'abonnement n'apparaît qu'en mode normal</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 