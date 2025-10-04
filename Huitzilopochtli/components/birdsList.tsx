

import React, { useState } from 'react';
import Styles from './cardBirds.module.css';

interface BirdObservation {
  id: number;
  place_guess: string | null;
  
  observed_on_details: {
    date: string; // 
  };
  time_observed_at: string | null; 
  observed_time_zone: string; 
  
  taxon: {
    name: string;
    preferred_common_name: string | null;
    wikipedia_url: string | null; 
  };
  
  photos: {
    url: string;
    attribution: string; 
  }[];
  user: {
    login: string; 
    name: string | null; 
  };
}

const BirdFinder: React.FC = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [birds, setBirds] = useState<BirdObservation[]>([]);
  const [birdsLoading, setBirdsLoading] = useState<boolean>(false);
  const [birdsError, setBirdsError] = useState<string | null>(null);

  const formatDateTime = (utcDate: string | null, timeZone: string): string => {
    if (!utcDate) return 'Data não disponível';
    const date = new Date(utcDate);
    return date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timeZone,
    });
  };

  const fetchBirds = async (coords: GeolocationCoordinates) => {
    setBirdsLoading(true);
    setBirdsError(null);
    setBirds([]);

    const { latitude, longitude } = coords;
    
    const radius = 200; 
    const url = `https://api.inaturalist.org/v1/observations?lat=${latitude}&lng=${longitude}&radius=${radius}&iconic_taxa=Aves&photos=true&order_by=observed_on&per_page=50&locale=pt-BR`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('A resposta da API de pássaros não foi bem-sucedida.');
      const data = await response.json();
      setBirds(data.results);
    } catch (err) {
      setBirdsError('Falha ao buscar os dados dos pássaros.');
      console.error(err);
    } finally {
      setBirdsLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocalização não é suportada pelo seu navegador.');
      return;
    }
    setLocationLoading(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        setLocationLoading(false);
        fetchBirds(position.coords);

        console.log('Localização obtida:', position.coords);
      },
      (err: GeolocationPositionError) => {
        setLocationError(err.message);
        setLocationLoading(false);
      }
    );
  };
  
  return (
    <div>
      <div className="flex items-center justify-center m-7 p-4 flex-col">
        <h2 className="text-2xl font-bold mb-4">Encontre Pássaros na sua Região</h2>
        <button 
          onClick={handleGetLocation} 
          disabled={locationLoading || birdsLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          {locationLoading ? 'Obtendo localização...' : 'Usar Localização e Buscar Pássaros'}
        </button>
      </div>

      {locationLoading && <p className="text-center">Aguardando permissão e dados de localização...</p>}
      {locationError && <p className="text-center text-red-500">Erro de Localização: {locationError}</p>}
      
      <div className="p-4">
        {birdsLoading && <p className="text-center">Buscando pássaros... Isso pode levar um momento.</p>}
        {birdsError && <p className="text-center text-red-500">{birdsError}</p>}
        
        {birds.length > 0 && <h3 className="text-xl font-semibold text-center mb-4">Pássaros observados recentemente na sua região:</h3>}
        
        {/* 4. Novo card de exibição com as informações expandidas */}
        <div className="flex flex-wrap gap-6 justify-center">
            {birds.map((obs) => (
                <div key={obs.id} className={`${Styles.card} w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden`}>
                    <img 
                        src={obs.photos[0]?.url.replace('square', 'large')} 
                        alt={obs.taxon.preferred_common_name || 'Pássaro'}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h4 className="text-lg font-bold">
                            {obs.taxon.preferred_common_name || obs.taxon.name}
                        </h4>
                        <p className="text-sm text-gray-600 italic">{obs.taxon.name}</p>

                        <div className="text-sm text-gray-700 mt-2">
                            <p><strong>📍 Local:</strong> {obs.place_guess || 'Não especificado'}</p>
                            <p><strong>📅 Avistamento:</strong> {formatDateTime(obs.time_observed_at, obs.observed_time_zone)}</p>
                            <p><strong>👤 Observador:</strong> {obs.user.name || obs.user.login}</p>
                            <p className="mt-1"><strong>📷 Foto:</strong> {obs.photos[0]?.attribution}</p>
                        </div>

                        {obs.taxon.wikipedia_url && (
                          <a 
                            href={obs.taxon.wikipedia_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline mt-4 inline-block"
                          >
                            Saiba mais na Wikipédia ↗
                          </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BirdFinder;