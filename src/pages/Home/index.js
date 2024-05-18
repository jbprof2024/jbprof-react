import { NavLink } from 'react-router-dom';

import { React, useEffect, useState } from 'react';
import { ChevronRightIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import CardCorso from '../../components/CardCorso';
import { getCorsi } from '../../helpers/apiHelper';
import MyLoader from '../../components/Loader';
import { checkLogin } from '../../helpers/apiHelper';

import './index.css'
function Home() {

    const [corsi, setCorsi] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [showAllRes, setShowAllRes] = useState(false)
    const [showAllFad, setShowAllFad] = useState(false)

    // current date in format YYYY-MM-DD
    const today = new Date().toISOString().slice(0, 10);
    // three months ago in format YYYY-MM-DD
    const nMonthsAgo = new Date(new Date().setDate(new Date().getDate() - (30 * 3))).toISOString().slice(0, 10);

    const in12months = new Date(new Date().setDate(new Date().getDate() + (30 * 12))).toISOString().slice(0, 10);

    useEffect(() => {
        getCorsi(today, in12months, 30)
            .then((response) => {
                setCorsi(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div className='container mx-auto w-[80%]'>
            <div className='flex md:flex-row flex-col text-start justify-between'>
                <div className='flex-none md:w-1/2 w-100 my-auto'

                >
                    <div className='dots-container'>
                        <img className='dots' src='/brand/dots.png' />
                    </div>
                    <h2 className='jb-text-green text-4xl'>Forma il tuo futuro.</h2>
                    <p
                        className='mt-4 text-xl description-text font-light'>Il lavoro <b className='font-medium'>continua</b>. La <b className='font-medium'>formazione</b> pure.</p>
                    <p
                        className='text-xl description-text font-light mt-4'>Siamo specialisti della formazione continua nelle life science, dove sanità e salute si incontrano.</p>
                    <p
                        className='text-xl description-text font-light mt-4'>Progettiamo e realizziamo corsi ed eventi residenziali e in remoto (Formazione a Distanza - FAD) per garantire lo sviluppo delle competenze di tutti i professionisti delle life science.</p>
                    <p
                        className='text-xl description-text font-light mt-3'>Aggiornati e migliora le tue abilità. Da medico o da operatore sanitario il tuo futuro dipende da competenze, flessibilità e consapevolezza delle sfide che tecnologia e ambiente rinnovano ogni giorno.</p>
                    <p
                        className='bg-gray-100 description-text rounded-tr-lg rounded-bl-lg px-4 py-2 text-2xl font-light mt-4'><span className='jb-text-green'> Il futuro <b className='font-medium'>continua</b>. La <b className='font-medium'>formazione</b> pure. <b className='font-medium'>Forma il tuo futuro</b>.</span></p>
                </div>

                <div className='md:mt-0 mt-8 my-auto'>
                    <img className='md:max-w-lg' src='/brand/home-img.png' />
                </div>
            </div>


            <div className='flex md:flex-row flex-col text-start mt-12'>
                <div>
                    <h2 className='jb-text-green text-4xl'>Eventi e congressi</h2>
                    <div className='flex md:flex-row flex-col'>
                        <NavLink to='/corsi?tipo=res' className='text-lg mt-4 font-light translate1px'>
                            <div className='mt-5 flex'>
                                <img className='w-[6.5rem] h-[6.5rem]' src='/brand/res-icon.png' />
                                <div className='my-auto ms-4'>
                                    <h5 className='jb-text-green font-medium text-3xl'>RES</h5>
                                    <h5 className='jb-text-green font-light text-2xl'>Corsi ed eventi residenziali</h5>
                                </div>

                                {/* Caret right */}
                                <div className='my-auto ms-4'>
                                    <ChevronRightIcon className='h-6 w-6 jb-text-green' />
                                </div>
                            </div>
                        </NavLink>

                        <NavLink to='/corsi?tipo=fad' className='text-lg mt-4 font-light md:ms-24 translate1px'>
                            <div className='mt-5 flex'>
                                <img className='w-[6.5rem] h-[6.5rem]' src='/brand/fad-icon.png' />
                                <div className='my-auto ms-4'>
                                    <h5 className='jb-text-blue font-medium text-3xl'>FAD</h5>
                                    <h5 className='jb-text-blue font-light text-2xl'>Formazione a distanza</h5>
                                </div>

                                {/* Caret right */}
                                <div className='my-auto ms-4'>
                                    <ChevronRightIcon className='h-6 w-6 jb-text-blue' />
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>

            <section id="corsi-res" className='text-start'>
                <div className='flex flex-col md:flex-row mt-14 justify-between'>
                    <h2 className='jb-text-green text-4xl'>Corsi RES in programmazione</h2>
                    <button
                        className="jb-bg-green text-white py-2 px-4 rounded-lg flex translate1px md:mt-0 mt-4
                        invisible md:visible
                        "
                        onClick={() => {
                            setShowAllRes(!showAllRes);
                            // scroll to section
                            const element = document.getElementById("corsi-res");
                            element.scrollIntoView({ behavior: "smooth" });

                        }}                        >
                        Vedi tutti <ArrowRightCircleIcon height={25} className='ms-2' />
                    </button>
                </div>

                <div className={'flex md:flex-row flex-col text-start scrollable-corsi'}>
                    {isLoading ? <MyLoader /> : <div>
                        <div className={'flex ' + (showAllRes ? 'flex-wrap' : 'md:flex-row flex-col')}>
                            {corsi
                                .filter(x => x.corso_fad == "0").length > 0 ?
                                corsi
                                    .filter(x => x.corso_fad == "0")
                                    .map((corso) => (
                                        <CardCorso
                                            className={'mx-auto'}
                                            key={corso.ID_Corsi}
                                            id={corso.ID_Corsi}
                                            title={corso.Nome_Corsi}
                                            date={corso.Data_inizio}
                                            tag={corso.CodiceECM_Corsi == null ? null : "ECM"}
                                            type={corso.corso_fad == 1 ? "fad" : "res"}
                                            codice={corso.CodiceECM_Corsi}
                                            // image={'https://picsum.photos/500'}
                                            image={'https://jbprof.com/' + corso.path_img2}
                                        />
                                    )) : <p className='text-2xl font-light mt-3'>Non ci sono corsi RES in programmazione</p>}
                        </div>
                    </div>}
                </div>
            </section>

            {corsi && corsi
                .filter(x => x.corso_fad != "0").length > 0 ? <section id="corsi-fad" className='text-start'>
                <div className='flex flex-col md:flex-row mt-24 justify-between'>
                    <h2 className='jb-text-blue text-4xl'>Corsi FAD in programmazione</h2>
                    <NavLink to='corsi?tipo=fad'>
                        <button className="jb-bg-blue text-white py-2 px-4 rounded-lg flex translate1px md:mt-0 mt-4">
                            Vedi tutti <ArrowRightCircleIcon height={25} className='ms-2' />
                        </button>
                    </NavLink>
                </div>

                <div className={'flex md:flex-row flex-col text-start scrollable-corsi'}>
                    {isLoading ? <MyLoader /> : <div>
                        <div className='flex md:flex-row flex-col'>
                            {corsi
                                .filter(x => x.corso_fad != "0")
                                .map((corso) => (
                                    <CardCorso
                                        key={corso.ID_Corsi}
                                        id={corso.ID_Corsi}
                                        title={corso.Nome_Corsi}
                                        date={corso.Data_inizio}
                                        tag={corso.CodiceECM_Corsi == null ? null : "ECM"}
                                        type={"fad"}
                                        codice={corso.CodiceECM_Corsi}
                                        // image={'https://picsum.photos/500'}
                                        image={'https://jbprof.com/' + corso.path_img2}
                                    />
                                ))}
                        </div>
                    </div>}
                </div>
            </section> : null}

        </div>
    );
}

export default Home;



