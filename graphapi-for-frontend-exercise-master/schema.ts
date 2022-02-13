const { gql, UserInputError } = require("apollo-server");

import { Broker, Property } from "./entities";
import { RealEstateStore } from "./store";

const typeDefs = gql`
  type Broker {
    id: Int!
    name: String!
    address: String
  }

  input BrokerInput {
    name: String!
    address: String
  }

  type Property {
    id: Int!
    broker: Broker!
    address: String!
    latitude: Float
    longitude: Float
    price: Int
    currency: String
  }

  input PropertyInput {
    brokerId: Int!
    address: String!
    latitude: Float
    longitude: Float
    price: Int
    currency: String
  }

  type Query {
    brokers: [Broker]
    properties: [Property]
  }

  type Mutation {
    createBroker(brokerInput: BrokerInput!): Broker
    createProperty(propertyInput: PropertyInput!): Property
  }
`;

const resolvers = {
  Query: {
    brokers: () => RealEstateStore.brokers,
    properties: () => RealEstateStore.properties
  },
  Mutation: {
    createBroker: (parent, { brokerInput }) => {
      const newBrokerId = RealEstateStore.brokers.length + 1;
      const newBroker: Broker = { id: newBrokerId, ...brokerInput };
      RealEstateStore.pushBroker(newBroker);
      return newBroker;
    },
    createProperty: (parent, { propertyInput }) => {
      const { brokerId } = propertyInput;
      const broker: Broker | undefined = RealEstateStore.brokers.find(
        broker => broker.id === brokerId
      );
      if (!broker) {
        throw new UserInputError("Invalid Broker ID, does not exists", {
          invalidArgs: { brokerId }
        });
      }
      const newpPropertyId = RealEstateStore.properties.length + 1;
      const newProperty: Property = {
        id: newpPropertyId,
        broker,
        ...propertyInput
      };
      RealEstateStore.pushProperty(newProperty);
      return newProperty;
    }
  }
};

export { typeDefs, resolvers };
