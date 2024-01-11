export interface Address {
  id: string;
  title: string;
  label: string;
  citycode: string;
  postcode: string;
  context: string;
  city: string;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Property;
}

interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface Property {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  district: string;
  context: string;
  type: string;
  importance: number;
  street: string;
  distance: number;
}

export interface FeatureCollection {
  features: Feature[];
}
