export interface WeatherAlertResponse {
  product: Product;
  meta: Meta;
}

export interface Product {
  warning_type: string;
  type_cdp: string;
  version_vigilance: string;
  version_cdp: string;
  update_time: string;
  domain_id: string;
  global_max_color_id: string;
  periods: Period[];
}

export interface Period {
  echeance: string;
  begin_validity_time: string;
  end_validity_time: string;
  text_items: TextItems;
  timelaps: Timelaps;
  max_count_items: MaxCountItem[];
  per_phenomenon_items: PerPhenomenonItem[];
}

export interface TextItems {
  title: string;
  text: any[];
}

export interface Timelaps {
  domain_ids: DomainId[];
}

export interface DomainId {
  domain_id: string;
  max_color_id: number;
  phenomenon_items: PhenomenonItem[];
}

export interface PhenomenonItem {
  phenomenon_id: string;
  phenomenon_max_color_id: number;
  timelaps_items: TimelapsItem[];
}

export interface TimelapsItem {
  begin_time: string;
  end_time: string;
  color_id: number;
}

export interface MaxCountItem {
  color_id: number;
  color_name: string;
  count: number;
  text_count: string;
}

export interface PerPhenomenonItem {
  phenomenon_id: string;
  any_color_count: number;
  phenomenon_counts: PhenomenonCount[];
}

export interface PhenomenonCount {
  color_id: number;
  color_name: string;
  count: number;
  text_count: string;
}

export interface Meta {
  snapshot_id: string;
  product_datetime: string;
  generation_timestamp: string;
}
