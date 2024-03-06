interface FeatureCollection {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: Feature[];
}

interface Feature {
  type: string;
  properties: {
    code_udi: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][][];
  };
}

export type Udis = FeatureCollection;
