import { gql } from "@apollo/client";

export const CREATE_BROKER = gql`
mutation createBroker($brokerInput: BrokerInput!) {
    createBroker(brokerInput: $brokerInput) {
        id
        name
        address
    }
}
`;

export const CREATE_PROPERTIE = gql`
mutation createProperty($propertyInput: PropertyInput!) {
    createProperty(propertyInput: $propertyInput) {
        id
        broker {
            id
            name
            address
        }
        address
        latitude
        longitude
        price
        currency
    }
}
`;
