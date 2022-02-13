import { Broker, Property } from "./entities";

// Some fake data
const brokers: Broker[] = [
  {
    id: 1,
    name: "Fake Real State Broker",
    address: "Fake Street 123"
  },
  {
    id: 2,
    name: "Another Real State Broker"
  }
];

const properties: Property[] = [
  {
    id: 1,
    address: "Swift Corner 200",
    broker: brokers[0],
    price: 10000,
    currency: "USD"
  },
  {
    id: 2,
    address: "Forge Bridge 5500",
    broker: brokers[0],
    latitude: -34.5968056,
    longitude: -58.3793693,
    price: 20000,
    currency: "USD"
  },
  {
    id: 3,
    address: "Wells Firs 6010",
    broker: brokers[0],
    price: 50000000,
    currency: "ARS"
  },
  {
    id: 4,
    address: "Ings Pines 989",
    broker: brokers[1],
    latitude: -34.5875496,
    longitude: -58.4359382,
    price: 6000000,
    currency: "ARS"
  },
  {
    id: 5,
    address: "Elder Orchard 189",
    broker: brokers[1],
    latitude: -34.5535045,
    longitude: -58.4419348,
    price: 10,
    currency: "USD"
  }
];

class Store {
  private static instance: Store;

  private _brokers: Broker[] = brokers;
  private _properties: Property[] = properties;

  private constructor() {}

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  get brokers(): Broker[] {
    return this._brokers;
  }

  get properties(): Property[] {
    return this._properties;
  }

  pushEntity(entities: any[], entity: any): any[] {
    return [...entities, entity];
  }

  pushBroker(broker: Broker): void {
    this._brokers = this.pushEntity(this.brokers, broker);
  }

  pushProperty(property: Property): void {
    this._properties = this.pushEntity(this.properties, property);
  }
}

export const RealEstateStore = Store.getInstance();
