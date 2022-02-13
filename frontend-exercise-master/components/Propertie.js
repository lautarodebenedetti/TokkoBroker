import React from 'react'

const Propertie = ({propertie}) => {

    const { broker: { name }, address, latitude, longitude, price, currency } = propertie;

    return (
        <tr>
            <td className='border px-4 py-2'>{name}</td>
            <td className='border px-4 py-2'>{address}</td>
            <td className='border px-4 py-2'>{latitude}</td>
            <td className='border px-4 py-2'>{longitude}</td>
            <td className='border px-4 py-2'>{price}</td>
            <td className='border px-4 py-2'>{currency}</td>
        </tr>
    );
}

export default Propertie;