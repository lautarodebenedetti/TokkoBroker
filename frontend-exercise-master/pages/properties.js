import { useQuery } from '@apollo/client';
import React from 'react';
import Link from 'next/link';
import { GET_PROPERTIES } from '../apollo/apollo-querys';
import Layout from '../components/Layout';
import Propertie from '../components/Propertie';

const Properties = () => {

    const { data, loading, error } = useQuery(GET_PROPERTIES);

    if (loading) return '...Loading';

    const { properties } = data;

    return ( 
        <>
            <Layout>
                <h1 className='text-2xl text-gray-800 font-light'>Properties</h1>
                <Link href="/createpropertie">
                    <a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center'>Create Propertie</a>
                </Link>

                <div className='overflow-x-scroll'>
                    <table className='table-auto shadow-md mt-10 w-full w-lg'>
                        <thead className='bg-gray-800'>
                        <tr className='text-white'>
                            <th className='w:1/6 py-2'>Broker</th>
                            <th className='w:1/6 py-2'>Address</th>
                            <th className='w:1/6 py-2'>Latitude</th>
                            <th className='w:1/6 py-2'>Longitude</th>
                            <th className='w:1/6 py-2'>Price</th>
                            <th className='w:1/6 py-2'>Corruncy</th>
                        </tr>
                        </thead>

                        <tbody className='bg-white'>
                        {properties.map( propertie => (
                            <Propertie 
                            key={propertie.id}
                            propertie={propertie}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
     );
}
 
export default Properties;