import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from "react-router-dom"
import { checkNewLogin, logout, getUserFromLocalStorage } from '../../helpers/apiHelper'
import { Select } from '@mantine/core';
import './index.css'
const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Corsi', href: '/corsi', current: false },
    { name: 'Contatti', href: '/contatti', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const [user, setUser] = useState(null)
    const [showAccedi, setShowAccedi] = useState(true)
    const [profileDropdown, setProfileDropdown] = useState([
        { value: -1, label: 'Benvenuto' },
        { value: 0, label: 'Il mio Profilo' },
        { value: 1, label: 'I miei Corsi' },
        { value: 2, label: 'Esci' }
    ])

    useEffect(() => {

        // commit parziale, non ci si può basare su un oggetto user nei Cookies
        // bisogna fare modifiche al BE e salvare nel local storage il bearer token
        // concordare intervento tecnico per:
        // generare bearer token
        // inserire le guardie che decriptano il token nelle api be
        // salvare in local storage il bearer token

        checkNewLogin()
        .then((response) => {
            if (response.data.length > 0){

                setShowAccedi(false);

                setUser(JSON.parse(response.data));

                setProfileDropdown([
                    { value: -1, label: "Benvenuto/a" },
                    { value: 0, label: 'Il mio Profilo' },
                    { value: 1, label: 'I miei Corsi' },
                    { value: 2, label: 'Esci' }])

            }
            else {
                setShowAccedi(true)
            }
        })
        .catch((error) => {
            console.log(error);
        });

    }, [])

    return (
        <Disclosure as="nav" className="bg-white pb-12">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center z-50">
                                    <a
                                        href="/"
                                        target="_parent"
                                    >
                                        <img
                                            className="h-10 w-auto"
                                            src="/brand/main-logo.png"
                                            alt="jbprof"
                                        />
                                    </a>
                                </div>
                                <div className="hidden sm:ml-6 sm:block my-auto">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                target="_parent"
                                                className={({ isActive }) =>
                                                    isActive ? 'jb-text-green font-normal' : 'text-gray-600 hover:text-gray-900 font-light'
                                                }

                                                aria-current={item.current ? 'page' : undefined}

                                                onClick={() => {
                                                    navigation.map((item) => {
                                                        item.current = false
                                                    })
                                                    item.current = true
                                                }}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {showAccedi ? <a
                                    href={'/login'}
                                    target='_parent'
                                    type="button"
                                    className="p-1 jb-text-green"
                                >
                                    <span className="">Accedi</span>
                                </a> : <Select
                                    className='select-profile md:w-40 w-[10rem] z-0'
                                    data={profileDropdown}
                                    onChange={(event) => {
                                        if (event == 0)
                                            window.open(
                                                '/user-profilo.php',
                                                '_parent'
                                            );

                                        if (event == 1)
                                            window.open(
                                                '/user-corsi.php',
                                                '_parent'
                                            );

                                        if (event == 2) {
                                            var user = getUserFromLocalStorage()
                                            if (user)
                                                logout(user.Codice_Contatti)

                                            setTimeout(() => {
                                                window.open(
                                                    '/',
                                                    '_parent'
                                                );
                                            }, 2000);

                                        }
                                    }}
                                    styles={(theme) => ({
                                        item: {
                                            // applies styles to selected item
                                            '&[data-selected]': {
                                                '&, &:hover': {
                                                    backgroundColor: '#3EAF76',
                                                    color: 'white'
                                                },
                                            },

                                            // applies styles to hovered item (with mouse or keyboard)
                                            '&[data-hovered]': {},
                                        },
                                    })}
                                    value={-1} />}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    target='_parent'
                                    className={classNames(
                                        item.current ? 'jb-text-green' : 'text-gray-600 hover:text-gray-900 font-light',
                                        'block px-2 py-2'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                    onClick={() => {
                                        navigation.map((item) => {
                                            item.current = false
                                        })
                                        item.current = true
                                    }}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
