import React from 'react'

const Broker = ({broker}) => {

    const { name, address } = broker;

    return (
        <tr>
            <td className='border px-4 py-2'>{name}</td>
            <td className='border px-4 py-2'>{address}</td>
        </tr>
    );
}

export default Broker;