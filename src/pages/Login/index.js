import { React, useEffect, useState } from 'react';
import './index.css'
import { Loader } from '@mantine/core';

import { login, checkLogin, setUserInLocalStorage, getUserFromLocalStorage } from '../../helpers/apiHelper';
function Login() {

    useEffect(() => {
        var user = getUserFromLocalStorage()
        if (user) {
            checkLogin(user.Codice_Contatti)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.length > 0)
                        window.location.href = '/user-corsi.php';
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [])

    const [cf, setCf] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function userLogin(e) {
        setIsLoading(true);
        e.preventDefault();

        login(cf, password)
            .then((response) => {
                console.log(response.data[0]);
                if (response.data.length > 0 && response.data[0]) {
                    setUserInLocalStorage(response.data[0]);

                    // https://www.new.jbprof.com/login?iscrizione-corsi=1012      
                    // get parameter iscrizione-corsi
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const iscrizioneCorsi = urlParams.get('iscrizione-corsi')

                    if (iscrizioneCorsi)
                        window.location.href = '/iscrizione-corsi.php?ID_Corsi=' + iscrizioneCorsi;
                    else
                        window.location.href = '/user-corsi.php';
                }
                else
                    alert("Credenziali errate")
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    return (
        <div className='container mx-auto w-[80%]'>
            <div className='flex flex-col md:flex-row justify-between'>
                <div>
                    <div className='dots-container'>
                        <img className='dots' src='/brand/dots.png' />
                    </div>
                    <h2 className='jb-text-green text-4xl'>Accedi all’area riservata</h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-20">
                <div className="w-full md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className='dots-container'>
                        <img className='dots' src='/brand/dots.png' />
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 jb-login text-start">
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="cf" className="block mb-2 text-sm font-medium text-gray-900 ">Codice fiscale</label>
                                <input onChange={(e) => setCf(e.target.value)} value={cf} type="cf" name="cf" id="cf" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={userLogin}
                                    className="w-full text-white jb-bg-green focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <div className='flex justify-center'>Accedi {isLoading ? <Loader className='ms-2' color='white' size={'sm'} /> : null}</div>
                                </button>
                            </div>
                            <p className="font-light jb-text-green text-center">
                                <a href="/password-dimenticata">Recupera la password</a> | <a href="/registrazione">Registrati</a>
                            </p>
                        </form>
                    </div>
                    <div className='dots-container right-container'>
                        <img className='dots' src='/brand/dots.png' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;