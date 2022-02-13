import { useQuery } from '@apollo/client';
import React from 'react';
import Link from 'next/link';
import { GET_BROKERS } from '../apollo/apollo-querys';
import Layout from '../components/Layout';
import Broker from '../components/Broker';

const Brokers = () => {

    const { data, loading, error } = useQuery(GET_BROKERS);

    if (loading) return '...Loading';

    const { brokers } = data;

    return ( 
        <>
            <Layout>
                <h1 className='text-2xl text-gray-800 font-light'>Brokers</h1>
                <Link href="/createbroker">
                    <a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center'>Create Broker</a>
                </Link>

                <div className='overflow-x-scroll'>
                    <table className='table-auto shadow-md mt-10 w-full w-lg'>
                        <thead className='bg-gray-800'>
                        <tr className='text-white'>
                            <th className='w:1/2 py-2'>Name</th>
                            <th className='w:1/2 py-2'>Address</th>
                        </tr>
                        </thead>

                        <tbody className='bg-white'>
                        {brokers.map( broker => (
                            <Broker 
                            key={broker.id}
                            broker={broker}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
     );
}
 
export default Brokers;