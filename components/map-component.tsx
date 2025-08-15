"use client"

import { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import { IBannedCountry } from '@/types';

// Fix for Leaflet marker icons in Next.js
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  countries: IBannedCountry[];
}

export default function MapComponent({ countries }: MapComponentProps) {
  // Separate countries with polygon geometry from those with point coordinates
  const polygonCountries = countries.filter(country => 
    country.geometry.type === 'Polygon' && country.geometry.coordinates
  );
  
  const pointCountries = countries.filter(country => 
    country.properties.geo_point_2d && country.geometry.type !== 'Polygon'
  );

  const geoJsonData = {
    type: 'FeatureCollection' as const,
    features: polygonCountries,
  };

  const geoJsonStyle = {
    fillColor: '#ef4444',
    weight: 2,
    opacity: 1,
    color: '#dc2626',
    fillOpacity: 0.3,
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const popupContent = `
        <div>
          <h3>${feature.properties.shapeName || feature.properties.name || 'Restricted Area'}</h3>
          <p><strong>ISO:</strong> ${feature.properties.shapeISO || feature.properties.iso3 || 'N/A'}</p>
          <p><strong>Type:</strong> ${feature.properties.shapeType || 'Restricted Region'}</p>
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '500px', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Render polygon regions */}
      {polygonCountries.length > 0 && (
        <GeoJSON
          data={geoJsonData}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      )}
      
      {/* Render point markers for countries without polygon data */}
      {pointCountries.map((country, index) => {
        const point = country.properties.geo_point_2d;
        if (!point) return null;
        
        return (
          <CircleMarker
            key={`${country._id}-${index}`}
            center={[point.lat, point.lon]}
            radius={8}
            pathOptions={{
              color: '#dc2626',
              fillColor: '#ef4444',
              fillOpacity: 0.7,
              weight: 2,
            }}
          >
            <Popup>
              <div>
                <h3>{country.properties.name || 'Restricted Country'}</h3>
                <p><strong>ISO:</strong> {country.properties.iso3 || 'N/A'}</p>
                <p><strong>Region:</strong> {country.properties.region || 'N/A'}</p>
                <p><strong>Status:</strong> {country.properties.status || 'Restricted'}</p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
} 