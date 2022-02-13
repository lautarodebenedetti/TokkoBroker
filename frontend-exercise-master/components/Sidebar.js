import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const router = useRouter();

    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className='text-white text-2xl font-black'>Tokko Broker</p>
            </div>

            <nav className='mt-5 list-none'>
                <li className={router.pathname === '/brokers' ? 'bg-blue-800 p-2' : 'p-2'}>
                    <Link href="/brokers">
                        <a className='text-white block'>
                            Brokers
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/properties' ? 'bg-blue-800 p-2' : 'p-2'}>
                    <Link href="/properties">
                        <a className='text-white block'>
                            Properties
                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
    )
}

export default Sidebar;