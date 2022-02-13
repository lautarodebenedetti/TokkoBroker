import React, { useState } from 'react'
import Layout from '../components/Layout';
import { GET_BROKERS } from '../apollo/apollo-querys';
import { CREATE_BROKER } from '../apollo/apollo-mutations';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateBroker = () => {
    const [message, saveMessage] = useState(null);
    const [createBroker] = useMutation(CREATE_BROKER, {
        update(cache, { data: { createBroker}}) {
            const { brokers } = cache.readQuery({ query: GET_BROKERS });

            cache.writeQuery({
                query: GET_BROKERS,
                data: {
                    brokers: [...brokers, createBroker]
                }
            })
        }
    });
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            address: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                        .required('Name id required')
        }),
        onSubmit: async values => {
            const { name, address } = values;
            try {
                const { data } = await createBroker({
                    variables: {
                        brokerInput: {
                            name,
                            address
                        }
                    }
                });

                saveMessage(`The broker was created correctly : ${data.createBroker.name}`);
                setTimeout(() => {
                    saveMessage(null);
                    router.push('/brokers');
                }, 3000);


            } catch(error) {
                saveMessage(error.message.replace('GraphQL error', ''));

                setTimeout(() => {
                    saveMessage(null);
                }, 3000);
            }
        }
    });

    const showmessage = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{message}</p>
            </div>
        )
    }

    return (
        <>
            <Layout>
                {message && showmessage()}
                <h1 className='text-center text-2xl text-black font-light'>Create Broker</h1>

                <div className='flex justify-center mt-5'>
                    <div className='w-full max-w-sm'>
                        <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='name' type='text' placeholder='Name' 
                                    value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>
                            {formik.touched.name && formik.errors.name ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null}

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>Address</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='address' type='text' placeholder='Address' 
                                    value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>
                            
                            <input className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                                type='submit'
                                value='Create broker'
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default CreateBroker;