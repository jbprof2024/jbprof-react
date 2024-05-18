import { NavLink } from 'react-router-dom';
import { React, useEffect, useState } from 'react';

import { CalendarIcon } from '@heroicons/react/24/outline'


import './index.css'

function CardCorso({ id, title, date, tag, codice, type, image, link, className }) {

    var textColor = type == 'res' ? 'jb-text-green' : 'jb-text-blue'
    var bgColor = type == 'res' ? 'jb-bg-green' : 'jb-bg-blue'

    // trim the title if it's too long
    if (title.length > 75)
        title = title.substring(0, 75) + '...';

    return (
        <NavLink to={'/info?id=' + id} className={'translate1px ' + className}>
            <div className="overflow-hidden mt-8  jb-card-corso md:me-6">
                <div className='jb-card-corso-img'>
                    <img className=" w-full p-4" src={image} />
                </div>
                <div className="px-6 py-4">
                    <div>
                        <div className={`jb-card-corso-title font-medium text-xl ${textColor} mb-2`}>{title}</div>
                        <div className={`${textColor} text-base flex`}>
                            <CalendarIcon height={25} />
                            <span className='ms-2 text-lg'>{date}</span>
                        </div>
                    </div>
                    <div className={`${textColor} mt-2 fix-bottom-tag `}>
                        {tag ? <span className={`${bgColor} text-white inline-block rounded px-2 py-[0.2rem] text-sm font-semibold mr-2 mb-2`}>{tag}</span> : null}
                        {codice ? <span>Codice: {codice}</span> : null}
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default CardCorso;



