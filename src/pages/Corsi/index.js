import { NavLink } from 'react-router-dom';
import { React, useEffect, useState } from 'react';
import { getCorsi } from '../../helpers/apiHelper';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import CorsiList from '../../components/CorsiList';
import MyLoader from '../../components/Loader';
import { Select } from '@mantine/core';

function Corsi() {


    const [corsi, setCorsi] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [pageTitle, setPageTitle] = useState('I nostri corsi')
    const [pageTextInfo, setPageTextInfo] = useState('in programmazione')
    const [showArchivio, setShowArchivio] = useState(false)
    const [archivioYearsDropdown, setArchivioYearsDropdown] = useState([
        { value: 0, label: 'Tutti gli anni' },
        { value: 2023, label: '2023' }, { value: 2022, label: '2022' }, { value: 2021, label: '2021' }, { value: 2020, label: '2020' }, { value: 2019, label: '2019' }, { value: 2018, label: '2018' }, { value: 2017, label: '2017' },
    ])
    const [archivioYearSelection, setArchivioYearSelection] = useState(0)


    var minStartDate = new Date().toISOString().slice(0, 10);
    var maxStartDate = new Date(new Date().setDate(new Date().getDate() + (30 * 9))).toISOString().slice(0, 10);

    const yearsAgo = new Date(new Date().setDate(new Date().getDate() - (30 * 70))).toISOString().slice(0, 10);
    const isShowingArchivio = window.location.href.includes('archivio')
    useEffect(() => {
        if (isShowingArchivio) {
            maxStartDate = minStartDate
            minStartDate = yearsAgo
            setShowArchivio(true)
            setPageTitle('Archivio corsi')
            setPageTextInfo('archiviati')

            // set archivioYears Dropdown from this year to 5 years ago 
            var years = [{ value: 0, label: 'Tutti gli anni' }]
            for (var i = new Date().getFullYear(); i >= new Date().getFullYear() - 5; i--) {
                years.push({ value: i, label: i })
            }
            setArchivioYearsDropdown(years)
        }

        window.scrollTo(0, 0);

        getCorsi(minStartDate, maxStartDate, null)
            .then((response) => {

                // if archivio, order by year desc 
                let corsi = response.data.sort((a, b) => {
                    return parseInt(b.Data_inizio.slice(-4)) - parseInt(a.Data_inizio.slice(-4))
                });

                if (isShowingArchivio) {
                    let corsiYearMap = {}
                    corsi.forEach(x => {
                        let year = parseInt(x.Data_inizio.slice(-4))
                        if (!corsiYearMap[year]) {
                            corsiYearMap[year] = []
                        }
                        corsiYearMap[year].unshift(x)
                    })

                    // corsi becomes the union of all the years, starting from the most recent year (2023)
                    corsi = []
                    for (var i = new Date().getFullYear(); i >= new Date().getFullYear() - 5; i--) {
                        if (corsiYearMap[i]) {
                            corsi = corsi.concat(corsiYearMap[i])
                        }
                    }
                }

                setCorsi(corsi);
                setIsLoading(false);

                setTimeout(() => {
                    const urlParams = new URLSearchParams(window.location.search);
                    const idTipo = urlParams ? urlParams.get('tipo') : null;
                    const year = urlParams ? urlParams.get('year') : null;

                    // scroll to idTipo
                    if (idTipo) {
                        var element = document.getElementById(idTipo);
                        if (element)
                            element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                    }

                    // set year
                    if (year) { setArchivioYearSelection(parseInt(year)) }


                    setCorsi(corsi);
                }, 300);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className='container mx-auto w-[80%]'>
            <div className='flex md:flex-row flex-col text-start justify-between'>
                <div className='flex-none md:w-[100%] w-100 my-auto'>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <div>
                            <div className='dots-container'>
                                <img className='dots' src='/brand/dots.png' />
                            </div>
                            <h2 className='jb-text-green text-4xl'>{pageTitle}</h2>
                        </div>
                        <a href={showArchivio ? '/corsi' : '/archivio'}>
                            <button className="jb-text-green py-2 px-4 rounded-lg flex translate1px md:mt-0 mt-4">
                                {showArchivio ? "Corsi attivi" : "Archivio corsi"} <ArrowRightCircleIcon height={25} className='ms-2' />
                            </button>
                        </a>
                    </div>
                    {showArchivio && !isLoading &&
                        <div className='flex flex-col md:flex-row mt-3 gap-4'>
                            <Select
                                label="Anno"
                                data={archivioYearsDropdown}
                                onChange={(event) => {
                                    setArchivioYearSelection(event)
                                    var url = new URL(window.location.href);
                                    url.searchParams.set('year', event);
                                    window.history.pushState({}, '', url);

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
                                value={archivioYearSelection} />
                        </div>
                    }
                </div>
            </div>

            {isLoading ? <MyLoader /> : <div className='flex md:flex-row flex-col text-start mt-5'>
                <div className='flex flex-col'>
                    <div id="res" className='text-lg mt-4 font-light'>
                        <CorsiList
                            title={'Corsi RES ' + pageTextInfo}
                            subtitle='Corsi ed eventi residenziali'
                            iconSrc='/brand/res-icon.png'
                            corsi={corsi
                                .filter(x => x.corso_fad == "0")
                                .filter(x => showArchivio && archivioYearSelection != 0 ? parseInt(x.Data_inizio.slice(-4)) == archivioYearSelection : true)
                            }
                            type='res'
                            className='mt-5' />
                    </div>

                    <div id="fad" className='text-lg mt-4 font-light '>
                        <CorsiList
                            title={'Corsi FAD ' + pageTextInfo}
                            subtitle='Formazione a distanza'
                            iconSrc='/brand/fad-icon.png'
                            corsi={corsi.
                                filter(x => x.corso_fad != "0")
                                .filter(x => showArchivio && archivioYearSelection != 0 ? parseInt(x.Data_inizio.slice(-4)) == archivioYearSelection : true)
                            }
                            type='fad'
                            className='mt-5' />
                    </div>

                </div>
            </div>}
        </div>

    );
}

export default Corsi;