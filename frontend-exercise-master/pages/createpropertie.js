import React, { useState } from 'react'
import Layout from '../components/Layout';
import { GET_BROKERS, GET_PROPERTIES } from '../apollo/apollo-querys';
import { CREATE_PROPERTIE } from '../apollo/apollo-mutations';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const CreatePropertie = () => {
    const [message, saveMessage] = useState(null);
    const { data, loading, error } = useQuery(GET_BROKERS);

    const [createProperty] = useMutation(CREATE_PROPERTIE, {
        update(cache, { data : { createProperty }}) {
            const { properties } = cache.readQuery({ query: GET_PROPERTIES});

            cache.writeQuery({
                query: GET_PROPERTIES,
                data: {
                    properties: [...properties, createProperty]
                }
            })
        }
    });
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            brokerId: '',
            address: '',
            latitude: 0,
            longitude: 0,
            price: 0,
            currency: 'USD'
        },
        validationSchema: Yup.object({
            brokerId: Yup.number()
                        .required('Broker is required'),
            address: Yup.string()
                        .required('Address of property is required'),
            price: Yup.number()
                        .positive('Price has to be positive')
        }),
        onSubmit: async values => {
            const { brokerId, address, latitude, longitude, price, currency } = values;

            try {
                const { data } = await createProperty({
                    variables: {
                        propertyInput: {
                            brokerId,
                            address,
                            latitude,
                            longitude,
                            price, 
                            currency
                        }
                    }
                });

                saveMessage(`The propertie was created correctly`);
                setTimeout(() => {
                    saveMessage(null);
                    router.push('/properties');
                }, 3000);


            } catch(error) {
                saveMessage(error.message.replace('GraphQL error', ''));

                setTimeout(() => {
                    saveMessage(null);
                }, 3000);
            }
        }
    });

    if(loading) return null;

    const { brokers } = data;

    const showMessage = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{message}</p>
            </div>
        )
    }

    return (
        <>
            <Layout>
                {message && showMessage()}
                <h1 className='text-center text-2xl text-black font-light'>Create Propertie</h1>

                <div className='flex justify-center mt-5'>
                    <div className='w-full max-w-sm'>
                        <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
                            
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>Broker</label>
                                <Select 
                                    className='shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    options={ brokers }
                                    getOptionValue={ options => options.id}
                                    getOptionLabel={ options => `${options.name}`}
                                    placeholder="Search or select the broker"
                                    noOptionsMessage={() => "No results"}
                                    onChange={selectedOption => {
                                        let event = { target : { name:'brokerId',value: selectedOption.id}}
                                        formik.handleChange(event)
                                    }}
                                    onBlur={()=>{
                                        formik.handleBlur({ target: {name:'brokerId'} });
                                    }}
                                />
                            </div>
                            {formik.touched.brokerId && formik.errors.brokerId ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.brokerId}</p>
                                </div>
                            ) : null}
                            
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>Address</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='address' type='text' placeholder='Address' 
                                    value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>
                            {formik.touched.address && formik.errors.address ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.address}</p>
                                </div>
                            ) : null}

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='latitude'>Latitude</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='latitude' type='number' placeholder='Latitude' 
                                    value={formik.values.latitude} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>
                            
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='longitude'>Longitude</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='longitude' type='number' placeholder='Longitude' 
                                    value={formik.values.longitude} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>Price</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    id='price' type='number' placeholder='Price' 
                                    value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>
                            {formik.touched.price && formik.errors.price ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.price}</p>
                                </div>
                            ) : null}

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='currency'>Currency</label>
                                <select
                                    className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    value={formik.values.currency}
                                    onChange={selectedOption => {
                                        let event = { target : { name:'currency',value: selectedOption.target.value}}
                                        formik.handleChange(event)
                                    }}
                                    onBlur={()=>{
                                        formik.handleBlur({ target: {name:'currency'} });
                                    }}
                                >
                                    <option value='USD'>USD</option>
                                    <option value='ARS'>ARS</option>
                                </select>
                            </div>

                            <input className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                                type='submit'
                                value='Create propertie'
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default CreatePropertie;