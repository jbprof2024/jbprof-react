import { React, useEffect, useState } from 'react';
import './index.css'
import ContattiForm from '../../components/ContattiForm';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

function Contatti() {

    useEffect(() => {

    }, [])


    return (
        <div className='container mx-auto w-[80%]'>
            <div>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div>
                        <div className='dots-container'>
                            <img className='dots' src='/brand/dots.png' />
                        </div>
                        <h2 className='jb-text-green text-4xl'>Chi siamo</h2>
                    </div>
                </div>
                <div className='text-start mt-5'>
                    <p className='text-xl font-light'><b>jbprof</b> è un'azienda provider <a className='jb-text-green font-medium' target='_blank' href="/imgs/agenas.jpg">Age.na.s ID 72</a> specializzata dal 2004 nella formazione per le life science.</p>
                    <p className='text-xl font-light'>La nostra missione è offrire opportunità di apprendimento e confronto ai professionisti della salute, consentendo loro di sviluppare e migliorare competenze e capacità d’intervento.</p>
                    <p className='text-xl font-light mt-6'>Siamo esperti nella progettazione e realizzazione di corsi ed eventi, in presenza o a distanza, anche grazie a metodologie innovative e strumenti multimediali che rendono il processo di apprendimento coinvolgente e flessibile.</p>
                    <p className='text-xl font-light mt-6'>È di certo il nostro lavoro ma è anche la nostra passione: aiutare medici e operatori sanitari a sviluppare le loro abilità professionali - cliniche, tecniche o manageriali - per affrontare con successo la sfida del futuro. </p>
                    <p className='text-xl font-light mt-6'>Per farlo combiniamo una rete unica di competenze che assicurano un servizio integrato con servizi logistici e di ospitalità (dall’accoglienza al catering), estendendo l’offerta anche ad attività complementari quali l’audit, il controllo di qualità e i processi ESG (Environmental, Social and Governance) delle organizzazioni. </p>
                </div>

                <div className='flex flex-col md:flex-row mt-10 '>
                    <h1 className='font-light text-3xl text-start mx-auto my-auto md:max-w-lg'><b>Unisciti a noi</b> in questo viaggio di apprendimento e crescita. Scegli <b>jbprof</b> per la tua formazione sanitaria e scopri come possiamo aiutarti a raggiungere il successo nella tua carriera professionale.</h1>
                    <img src='/brand/chi-siamo-img.png' className='mt-10 w-[50%] ms-6' />
                </div>
            </div>

            <div>
                <div className='flex flex-col md:flex-row justify-between mt-5'>
                    <div>
                        <div className='dots-container'>
                            <img className='dots' src='/brand/dots.png' />
                        </div>
                        <h2 className='jb-text-green text-4xl'>Contattaci</h2>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row mt-10 text-start justify-between gap-10'>
                    <div className='md:w-[50%]'>
                        <p className='font-light text-xl'>La nostra segreteria è a vostra disposizione <b>dal lunedì al venerdì dalle ore 9:00 alle ore 17:30</b></p>
                        <h6 className='mt-5 text-xl jb-text-green font-medium'>
                            <div className='flex'><MapPinIcon height={25} /> <p className='ms-2'>Via Salvatore Loris Perrelli, 15 - 87036 Rende (CS)</p></div>
                            <div className='flex mt-2'><EnvelopeIcon height={25} /> <p className='ms-2'>segreteria@jbprof.com</p></div>
                            <div className='flex mt-2'><PhoneIcon height={25} /> <p className='ms-2'>+39 0984 837852</p></div>

                        </h6>
                    </div>
                    <ContattiForm />
                </div>
            </div>
        </div>
    );
}

export default Contatti;