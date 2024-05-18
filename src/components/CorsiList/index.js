import { React, useEffect, useState } from 'react';
import CardCorso from '../CardCorso';
import { Pagination } from '@mantine/core';

import './index.css'

function CorsiList({ title, subtitle, iconSrc, corsi, type = "res", limit = 8, className }) {

    var textColor = type == 'res' ? 'jb-text-green' : 'jb-text-blue'
    var bgColor = type == 'res' ? 'jb-bg-green' : 'jb-bg-blue'
    var hexColor = type == 'res' ? '#00A859' : '#0072BC'

    var perPage = limit;
    const [activePage, setPage] = useState(1);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams ? urlParams.get('page') : null;
        if (page) {
            setPage(parseInt(page));
        }
    }, []);

    function setPageAndScrollToId(page) {
        setPage(page);
        var element = document.getElementById(type);
        if (element)
            element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

        // update url
        var url = new URL(window.location.href);
        url.searchParams.set('page', page);
        window.history.pushState({}, '', url);
    }

    return (
        <div className={'translate1px ' + className}>
            {corsi && corsi.filter(x => type == "res" ? x.corso_fad == "0" : x.corso_fad != "0").length > 0 ?
                <div>
                    <div className='mt-5 flex'>
                        <img className='w-[7rem] h-[7rem]' src={iconSrc} />
                        <div className='my-auto ms-4'>
                            <h5 className={textColor + ' font-medium md:text-3xl text-2xl'}>{title}</h5>
                            <h5 className={textColor + ' font-light md:text-2xl text-1xl'}>{subtitle}</h5>
                        </div>
                    </div>
                    <div className='flex flex-wrap '>
                        {
                            corsi
                                .filter(x => type == "res" ? x.corso_fad == "0" : x.corso_fad != "0")
                                .slice((activePage - 1) * perPage, activePage * perPage)
                                .map((corso) => (
                                    <CardCorso
                                        key={corso.ID_Corsi}
                                        id={corso.ID_Corsi}
                                        title={corso.Nome_Corsi}
                                        date={corso.Data_inizio}
                                        tag={corso.CodiceECM_Corsi == '' ? null : "ECM"}
                                        type={type}
                                        codice={corso.CodiceECM_Corsi}
                                        image={'https://jbprof.com/' + corso.path_img2}
                                    />
                                ))}
                    </div>
                    <Pagination
                        className='mt-5'
                        value={activePage}
                        onChange={setPageAndScrollToId}
                        total={Math.ceil(corsi.filter(x => x.corso_fad == 0).length / perPage)}
                        styles={(theme) => ({
                            control: {
                                '&[data-active]': {
                                    backgroundImage: theme.fn.gradient({ from: hexColor, to: hexColor }),
                                    border: 0,
                                },
                            },
                        })} />
                </div> : null}
        </div>
    );
}

export default CorsiList;



