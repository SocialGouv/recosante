'use client';

import React, { useState, useEffect } from 'react';
import { MunicipalityService, Municipality } from '@/services/municipality';
import Indicators from '@/components/Indicators';
import { useIframe, useIframeMessage } from '@/hooks/useIframe';
import { FixedSubscribeButton } from '@/components/SubscribeButton';

interface PlacePageProps {
  params: {
    code: string;
    nom: string;
  };
}

function HeaderPlaceIframe({ place, date, setDate }: { place: Municipality, date: Date, setDate: (d: Date) => void }) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (d: Date) =>
    d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-row items-center justify-between bg-transparent mb-8 w-full">
      <div className="flex flex-col">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-2">{place.nom}</h1>
        <div className="text-xl text-gray-800 mb-2">
          {place.codesPostaux?.[0] || ''} - {place.codeDepartement}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="text-lg text-gray-700 mb-2">
          <span className="font-normal">le </span>
          <span className="underline font-medium">{formatDate(date)}</span>
        </div>
        <div className="flex rounded-lg overflow-hidden border border-blue-600">
          <button
            className={`px-6 py-2 font-semibold ${date.toDateString() === today.toDateString() ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
            onClick={() => setDate(today)}
          >
            Aujourd'hui
          </button>
          <button
            className={`px-6 py-2 font-semibold ${date.toDateString() === tomorrow.toDateString() ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
            onClick={() => setDate(tomorrow)}
          >
            Demain
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlacePage({ params }: PlacePageProps) {
  const [place, setPlace] = useState<Municipality | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isIframe = useIframe();
  
  // Gérer les messages iframe
  useIframeMessage();

  useEffect(() => {
    // Récupérer les données de la commune
    const fetchPlaceData = async () => {
      try {
        setLoading(true);
        const municipality = await MunicipalityService.getMunicipalityByCode(params.code);
        
        if (municipality) {
          setPlace(municipality);
        } else {
          setError('Commune non trouvée');
        }
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [params.code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur: {error || 'Commune non trouvée'}</p>
          <p className="text-gray-600">Veuillez vérifier l'URL ou réessayer plus tard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-r from-[#d1edff] via-[#f8fafd] to-[#d6eeff] ${isIframe ? 'p-4' : ''}`}>
      {/* Header spécifique iframe */}
      {isIframe && (
        <HeaderPlaceIframe place={place} date={selectedDate} setDate={setSelectedDate} />
      )}
      {/* Header classique */}
      {!isIframe && (
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {place.nom}
            </h1>
            <p className="text-lg text-gray-600">
              Indicateurs environnementaux
            </p>
          </div>
        </div>
      )}
      {/* Indicateurs */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Indicators place={place} day={selectedDate.toDateString() === new Date().toDateString() ? 'j0' : 'j1'} />
      </div>
      {/* Contenu supplémentaire seulement si pas en iframe */}
      {!isIframe && (
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              À propos de Recosanté
            </h2>
            <p className="text-gray-600 mb-4">
              Recosanté est un service public qui vous aide à connaître votre environnement 
              et à agir pour protéger votre santé.
            </p>
            <p className="text-gray-600">
              Recevez des alertes et prévisions en temps réel sur la qualité de l'air, 
              l'indice UV, le taux de pollen et les conditions météorologiques.
            </p>
          </div>
        </div>
      )}
      {/* Bouton d'abonnement fixe seulement si pas en iframe */}
      {!isIframe && <FixedSubscribeButton place={place} />}
    </div>
  );
} 