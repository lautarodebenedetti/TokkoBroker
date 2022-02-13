export interface Broker {
  id: number;
  name: string;
  address?: string | null;
}

export interface Property {
  id: number;
  broker: Broker;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  price?: number | null;
  currency?: string | null;
}
