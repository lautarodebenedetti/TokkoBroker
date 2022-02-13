import { gql } from "@apollo/client";

export const GET_BROKERS = gql`
    query brokers {
        brokers {
            id
            name
            address
        }
    }
`;

export const GET_PROPERTIES = gql`
    query properties {
        properties {
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
