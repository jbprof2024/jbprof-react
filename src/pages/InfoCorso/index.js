import { React, useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
    getCorso,
    getPhotos,
    getDiscipline,
    getProfessioni,
    getSede,
    getUserFromLocalStorage,
    getDate
} from '../../helpers/apiHelper';

import { CalendarIcon, MapPinIcon, CurrencyEuroIcon, UserGroupIcon, CheckBadgeIcon, ArrowDownCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import './index.css'
import MyLoader from '../../components/Loader';

function InfoCorso() {
    var type = 'res'
    var textColor = type == 'res' ? 'jb-text-green' : 'jb-text-blue'
    var bgColor = type == 'res' ? 'jb-bg-green' : 'jb-bg-blue'
    const [user, setUser] = useState(null)

    const [id, setId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [corso, setCorso] = useState({
        id: null,
        title: '',
        date: '',
        tag: '',
        codice: '',
        type: '',
        costo: '',
        note: '',
        sede: '',
        max_partecipanti: '',
        crediti: '',
        image: '',
        discipline: [],
        professioni: [],
        isArchived: false,
        iscrizioniAttive: false
    });
    const [photosUrls, setPhotosUrls] = useState([]);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    const parser = new DOMParser();

    useEffect(() => {
        // scroll to top
        window.scrollTo(0, 0);



        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams ? urlParams.get('id') : null;

        if (!id) {
            window.location.href = '/corsi'
        }
        setId(id)

        var user = getUserFromLocalStorage()
        setUser(user)

        getCorso(id).then(async (response) => {
            let responseCorso = (response.data[0]);
            const decodedText = parser.parseFromString(`<!doctype html><body>${responseCorso.Note_Corsi}`, 'text/html').body.textContent;

            // Replace <br> tags with new lines
            const textWithNewLines = decodedText.replace(/<br\s*\/?>/g, '\n');

            var today = new Date();

            // convert Data_inizio from "25\/11\/2017" to a date object
            // var dateParts = responseCorso.DataFine_Corsi ? responseCorso.DataFine_Corsi.split("/") : null;
            // var dateObject = new Date(+dateParts[0], dateParts[1] - 1,  +dateParts[2],);

            // create date object from format like 2023-12-31 00:00:00
            var dateObject = new Date(responseCorso.DataFine_Corsi.replace(' ', 'T'));
            var isPast = dateObject < today;

            if (isPast) {
                getPhotos(id)
                    .then((response) => {
                        let photos = (JSON.parse(response.data));
                        setPhotosUrls(photos);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            let discipline = await getDiscipline(id)
            if (discipline && discipline.data.length > 0)
                discipline = discipline.data.map(x => x.Nome_Discipline2017).sort()
            else
                discipline = ["Tutte le discipline"]

            let professioni = await getProfessioni(id)
            if (professioni && professioni.data.length > 0)
                professioni = professioni.data.map(x => x.Nome_Professioni2017).sort()
            else
                professioni = ["Tutte le professioni"]

            let sede = await getSede(responseCorso.Sede_Corsi)
            if (sede)
                sede = sede.data[0].nome
            else
                sede = ''

            let data = await getDate(id)
            if (data && data.data.length > 0) {
                let newdata = data.data.map(x => x.Data_Calendario.slice(0, 10)).sort()
                // convert from 2023-10-20 to 20/10/2023
                newdata = newdata.map(x => x.split('-').reverse().join('/'))
                // add Orario_Corsi of data in parenthesis if != -

                data = newdata.map((x, i) => {
                    if (data.data[i].Orario_Corsi != '-')
                        return x + ' (' + data.data[i].Orario_Corsi + ')'
                    else
                        return x
                })

            }


            setCorso({
                id: responseCorso.ID_Corsi,
                title: responseCorso.Nome_Corsi,
                date: data,
                tag: responseCorso.CodiceECM_Corsi == null ? null : "ECM",
                type: responseCorso.corso_fad == 1 ? "fad" : "res",
                costo: responseCorso.Costo_Corsi,
                note: textWithNewLines,
                sede: sede,
                max_partecipanti: responseCorso.Max_Partecipanti_Corsi_Visualizzato,
                crediti: responseCorso.Crediti_Corsi,
                codice: responseCorso.CodiceECM_Corsi,
                programma_link: responseCorso.Programma_Corsi,
                image: 'https://jbprof.com/' + responseCorso.path_img2,
                discipline: discipline,
                professioni: professioni,
                isArchived: isPast,
                iscrizioniAttive: responseCorso.Iscrizioni_Corsi != "0"
            })
            setIsLoading(false);
        });
    }, [])


    return (
        <div className='container mx-auto w-[80%]'>
            {isLoading ? <MyLoader /> : <div>
                <div className='flex md:flex-row flex-col text-start justify-between'>
                    <div className='flex-none md:w-1/2 w-100 my-auto'>
                        <div className='dots-container'>
                            <img className='dots' src='/brand/dots.png' />
                        </div>
                        <h2 className='jb-text-green text-4xl'>{corso.title}</h2>
                        <p className='jb-text-green mt-4 text-2xl font-light'>Corso accreditato {corso.tag} <small>(codice {corso.codice})</small></p>

                        <div className='jb-info-corso mt-5'>
                            <div className='flex flex-col md:flex-row justify-between'>
                                <div className='md:mt-0 mt-4'>
                                    <div className={`flex text-xl ${textColor}`}>
                                        <MapPinIcon height={25} />
                                        <h5 className='ms-2'>Sede</h5>
                                    </div>
                                    <p className='text-xl font-light'>{corso.sede}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between mt-4'>
                                <div className='md:w-1/2 md:me-auto'>
                                    <div className={`flex text-xl ${textColor}`}>
                                        <CalendarIcon height={25} />
                                        <h5 className='ms-2'>
                                            {corso.date && corso.date.length > 1 ? 'Date' : 'Data'}
                                        </h5>
                                    </div>
                                    {corso.date && corso.date.map((date) => (
                                        <p className='text-xl font-light'>{date}</p>
                                    ))}
                                </div>
                                {/* <div className='md:w-1/3 md:me-auto md:mt-0 mt-4'>
                                    <div className={`flex text-xl ${textColor}`}>
                                        <MapPinIcon height={25} />
                                        <h5 className='ms-2'>Sede</h5>
                                    </div>
                                    <p className='text-xl font-light'>{corso.sede}</p>
                                </div> */}
                                <div className='md:w-1/2 md:ms-auto md:mt-0 mt-4'>
                                    <div className={`flex text-xl ${textColor}`}>
                                        <CurrencyEuroIcon height={25} />
                                        <h5 className='ms-2'>Costo</h5>
                                    </div>
                                    <p className='text-xl font-light'>{corso.costo}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row justify-between mx-auto mt-5'>
                                <div className='md:w-1/2 md:ms-auto'>
                                    <div className={`flex text-xl ${textColor}`}>
                                        <UserGroupIcon height={25} />
                                        <h5 className='ms-2'><span className='font-base'>{corso.max_partecipanti}</span> <span className='text-black font-light'>partecipanti</span></h5>
                                    </div>
                                </div>
                                <div className='md:w-1/2 md:ms-auto md:mt-0 mt-2'>
                                    <div className={`flex text-xl ${textColor}`}>
                                        <CheckBadgeIcon height={25} />
                                        <h5 className='ms-2'><span className='font-base'>{corso.crediti}</span> <span className='text-black font-light'>crediti</span></h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col mt-5">
                            <a target='_blank' href={'https://www.jbprof.com/public/corsi/Programmi/' + corso.programma_link} className='flex translate1px jb-bg-gray jb-text-green hover:bg-gray-200 py-3 px-4 rounded'>
                                Programma del corso <ArrowDownCircleIcon height={20} className='ms-2 my-auto' />
                            </a>
                            <a
                                href={corso.isArchived || corso.iscrizioniAttive == false ? null : (!user && corso.costo != "Gratuito") ? `/login?iscrizione-corsi=${corso.id}` : ("/iscrizione-corsi?ID_Corsi=" + corso.id)}
                                className={'flex md:ms-3 mt-3 md:mt-0 jb-bg-green text-white py-3 px-4 rounded ' + (corso.isArchived || corso.iscrizioniAttive == false ? 'hover:cursor-not-allowed	opacity-[70%]' : 'translate1px hover:bg-green-600')}>
                                {corso.isArchived ? 'Corso archiviato' : <>Pre-iscriviti <ArrowRightCircleIcon height={20} className='ms-2 my-auto' /></>}
                            </a>
                        </div>
                    </div>

                    <div className='md:mt-0 mt-8 my-auto'>
                        <div className='dots-container'>
                            <img className='dots' src='/brand/dots.png' />
                        </div>
                        <img className='corso-img md:max-w-lg' src={corso.image} />
                        <div className='dots-container right-container'>
                            <img className='dots' src='/brand/dots.png' />
                        </div>
                    </div>
                </div>

                {corso.isArchived && photosUrls.length > 0 ? <div className='flex-none w-100 mt-12 text-start'>
                    <div className='md:w-[50%]'>
                        <div className='dots-container'>
                            <img className='dots' src='/brand/dots.png' />
                        </div>
                        <h2 className='jb-text-green text-3xl'>Galleria fotografica</h2>
                    </div>

                    <div className='mx-auto'>
                        <div className='flex flex-wrap gap-1 mt-5'>
                            {photosUrls && photosUrls
                                .slice(0, showAllPhotos ? -1 : 15)
                                .map((photoUrl) => (
                                    <a href={photoUrl} target='_blank'>
                                        <div className='w-[80%] mx-auto md:w-[13rem] translate1px'>
                                            <img className='gallery-img' src={photoUrl} />
                                        </div>
                                    </a>
                                ))}
                            {photosUrls.length > 15 ? <div className='my-auto ms-3 translate1px'>
                                <button onClick={() => setShowAllPhotos(!showAllPhotos)} className='gallery-img text-center justify-center'>
                                    <p className='text-xl jb-text-green'>{showAllPhotos ? 'Vedi meno foto' : 'Vedi più foto'}</p>
                                </button>
                            </div> : null
                            }
                        </div>
                    </div>
                </div> : null}


                <div className='flex-none w-100 mt-12 text-start'>
                    <div className='md:w-[50%]'>
                        <div className='dots-container'>
                            <img className='dots' src='/brand/dots.png' />
                        </div>
                        <h2 className='jb-text-green text-3xl'>Destinatari del corso</h2>
                    </div>
                    <div className='flex justify-between md:flex-row flex-col md:gap-10'>
                        <div id="professioni" className='md:w-[50%]'>
                            <p className='jb-text-green mt-4 text-xl font-light'>Professioni</p>
                            <ul className='list-disc'>
                                {corso.professioni.map((professione) => (
                                    <li className='mt-2 text-lg font-light'>{professione}</li>
                                ))}
                            </ul>
                        </div>
                        <div id="discipline" className='md:w-[50%]'>
                            <p className='jb-text-green mt-4 text-xl font-light'>Discipline</p>
                            <ul className='list-disc'>
                                {corso.discipline.map((disciplina) => (
                                    <li className='mt-2 text-lg font-light'>{disciplina}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {corso.note != '' ? <div className='flex-none w-100 mt-12 text-start'>
                    <div className='md:w-[50%] w-100'>
                        <div className='dots-container'>
                            <img className='dots' src='/brand/dots.png' />
                        </div>
                        <h2 className='jb-text-green text-3xl'>Note del corso</h2>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            {corso.isArchived ? <p className='mt-4 text-2xl font-medium'>Corso archiviato</p> : ''}
                            <p style={{ whiteSpace: 'pre-line' }} className='mt-4 text-xl font-light'>{parser.parseFromString(`<!doctype html><body>${corso.note}`, 'text/html').body.textContent}</p>
                        </div>

                    </div>
                </div> : <></>}
            </div>}
        </div>
    );
}

export default InfoCorso;



