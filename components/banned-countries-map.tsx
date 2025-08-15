"use client"

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchBannedCountries } from '@/redux/slices/banned-countries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-full" />
});

export function BannedCountriesMap() {
  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector((state) => state.bannedCountries);

  useEffect(() => {
    dispatch(fetchBannedCountries());
  }, [dispatch]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sanctioned Regions</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[500px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sanctioned Regions</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription >
              Failed to load sanctioned regions: {error}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Sanctioned Regions</span>
          <span className="text-sm font-normal text-muted-foreground">
            ({countries.length} regions)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full rounded-lg overflow-hidden border">
          <MapComponent countries={countries} />
        </div>
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm font-medium">
              Sanctioned regions are highlighted in red
            </span>
          </div>
          <p className="text-sm text-red-700 mt-1">
            These regions are currently under sanctions and may have restricted access to services.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 