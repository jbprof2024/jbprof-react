import { NavLink } from 'react-router-dom';
import { React, useEffect, useState } from 'react';
import { sendContattiMessage } from '../../helpers/apiHelper';

import './index.css'

function ContattiForm({ }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [messageBtnText, setMessageBtnText] = useState('Invia');

    function sendMessage() {
        sendContattiMessage(name, email, phone, subject, message)
            .then(() => {
                setName('');
                setEmail('');
                setPhone('');
                setSubject('');
                setMessage('');
                setMessageBtnText('Messaggio inviato');
            }
            ).catch((err) => {
                // alert('Errore nell\'invio del messaggio:\n\n ' + err);
                setMessageBtnText(err.toString());
                setTimeout(() => {
                    setMessageBtnText('Invia');
                }, 2000);
            })
    }

    return (
        <div className="jb-card-contatti p-8 md:w-[50%]">
            <div className='flex flex-col md:flex-row justify-between gap-5'>
                <div className='md:w-1/2'>
                    <div className={`flex text text-gray-500`}>
                        <h5 className=''>Nome e cognome</h5>
                    </div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='jb-input p-2 px-4 mt-2 w-full'
                        type='text'
                        placeholder='Mario Rossi' />
                </div>
                <div className='md:w-1/2'>
                    <div className={`flex text text-gray-500`}>
                        <h5 className=''>Email</h5>
                    </div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='jb-input p-2 px-4 mt-2 w-full'
                        type='email'
                        placeholder='mario@email.com' />
                </div>
            </div>
            <div className='mt-5 flex flex-col md:flex-row justify-between gap-5'>
                <div className='md:w-1/2'>
                    <div className={`flex text text-gray-500`}>
                        <h5 className=''>Telefono</h5>
                    </div>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='jb-input p-2 px-4 mt-2 w-full'
                        type='phone'
                        placeholder='345-1234567' />
                </div>
                <div className='md:w-1/2'>
                    <div className={`flex text text-gray-500`}>
                        <h5 className=''>Oggetto</h5>
                    </div>
                    <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className='jb-input p-2 px-4 mt-2 w-full'
                        type='text'
                        placeholder='Supporto' />
                </div>
            </div>
            <div className='mt-5 flex flex-col md:flex-row justify-between gap-5'>
                <div className='w-full'>
                    <div className={`flex text text-gray-500`}>
                        <h5 className=''>Testo</h5>
                    </div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='jb-input p-2 px-4 mt-2 w-full'
                        type='text'
                        rows={5}
                        placeholder='Inserisci qui il tuo messaggio' />
                </div>
            </div>
            <div className='mt-5 flex flex-col md:flex-row justify-between gap-5'>
                <div className='w-full'>
                    <button
                        onClick={sendMessage}
                        className='rounded-md p-2 text-white jb-bg-green w-full'>{messageBtnText}</button>
                </div>
            </div>
        </div>
    );
}

export default ContattiForm;



