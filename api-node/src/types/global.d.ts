// Types globaux pour l'application

// Déclaration de module pour @weacast/grib2json
declare module '@weacast/grib2json' {
  /**
   * Parse un buffer GRIB en JSON
   * @param buffer Buffer GRIB à parser
   * @param options Options de parsing
   * @param callback Fonction de callback appelée avec les données parsées
   */
  function parse(
    buffer: Buffer,
    options: {
      data?: boolean;
      inventory?: boolean;
      regex?: string;
      filter?: boolean;
      [key: string]: any;
    },
    callback: (err: Error | null, data: any) => void,
  ): void;

  export default parse;
}
