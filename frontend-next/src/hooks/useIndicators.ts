"use client";

import { useState, useEffect } from 'react';
import { IndicatorService, type Indicator } from '@/services/indicator';

interface UseIndicatorsProps {
  municipalityCode: string;
}

interface UseIndicatorsReturn {
  indicators: Indicator[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useIndicators({ municipalityCode }: UseIndicatorsProps): UseIndicatorsReturn {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndicators = async () => {
    if (!municipalityCode) {
      setError('Code de commune requis');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await IndicatorService.getIndicators(municipalityCode);
      setIndicators(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des indicateurs');
      console.error('Erreur dans useIndicators:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicators();
  }, [municipalityCode]);

  const refetch = () => {
    fetchIndicators();
  };

  return {
    indicators,
    loading,
    error,
    refetch,
  };
} 