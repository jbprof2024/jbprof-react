import { Fragment } from 'react'
import { NavLink } from "react-router-dom"

// Heroicons, phone icon, map icon, mail icon

import { PhoneIcon, MapPinIcon, EnvelopeIcon, } from '@heroicons/react/24/outline'
import CookieConsent from "react-cookie-consent";


export default function Footer() {
    return (
        <div>
            <CookieConsent
                location="bottom"
                buttonText="Accetta"
                enableDeclineButton={true}
                declineButtonText="Rifiuta"
                declineButtonStyle={{ background: "#ff5000", color: "#fff", fontSize: "13px", borderRadius: '8px' }}
                buttonStyle={{ background: "#3EAF76", color: "#fff", fontSize: "13px", borderRadius: '8px' }}
                cookieName="cookieConsent"
                style={{ background: "#f5f5f5", fontSize: "17px", color: "#000" }}
                expires={150}
            >
                Questo sito utilizza i cookie per migliorare l'esperienza di navigazione.{" "}
                <a className='text-sm text-gray-500' href='/privacy'>Leggi di più</a>
            </CookieConsent>

            <footer className="relative jb-bg-green pt-8 pb-6 mt-24">
                <div className="container mx-auto px-4 w-[80%]">
                    <img src='/brand/white-logo.png' className='h-24 w-auto' />
                    <div className="flex flex-wrap text-left lg:text-left">
                        <div className="w-full lg:w-1/2 px-4">
                            <div className='dots-container opacity-70'>
                                <img className='dots' src='/brand/dots-white.png' />
                            </div>
                            <h5 className="text-xl mt-4 mb-2 text-white">Informazioni aziendali</h5>
                            <h6 className='text-lg text-white font-light'>
                                J&B S.r.l. Unipersonale © 2013 – 2024<br />
                                Partita IVA 02610180784<br />
                                PEC jbprof@legalmail.it<br />
                                Iscritta al CCIAA di Cosenza n. REA 176947<br />
                            </h6>

                            <a target='_blank' href="https://www.federcongressi.it/index.cfm/it/">
                                <img src='/brand/logos/federcongressi.png' className='h-12 w-auto mt-5' />
                            </a>
                        </div>

                        <div className="w-full lg:w-1/2 px-4">
                            <div className="flex flex-wrap mb-6">
                                <div className="w-full px-4 ml-auto">
                                    <div className='dots-container opacity-70'>
                                        <img className='dots' src='/brand/dots-white.png' />
                                    </div>
                                    <h5 className="text-xl mt-4 mb-2 text-white">Recapiti</h5>
                                    <h6 className='text-lg text-white font-light'>
                                        <div className='flex'><MapPinIcon height={25} /> <p className='ms-2'>Via Salvatore Loris Perrelli, 15 - 87036 Rende (CS)</p></div>
                                        <div className='flex mt-2'><EnvelopeIcon height={25} /> <p className='ms-2'>segreteria@jbprof.com</p></div>
                                        <div className='flex mt-2'><PhoneIcon height={25} /> <p className='ms-2'>+39 0984 837852</p></div>
                                    </h6>

                                    <h5 className="text-xl mt-6 mb-2 text-white">Rimani in contatto con noi seguendoci sui nostri canali social</h5>
                                    <div className='text-white'>
                                        <a target='_blank' href="https://www.facebook.com/Jbprof/"><i className='fab fa-xl translate1px fa-facebook'></i></a>
                                        <a target='_blank' href="https://www.linkedin.com/company/j&b-s.r.l/"><i className='fab fa-xl translate1px fa-linkedin ms-4 text-white'></i></a>
                                        <a target='_blank' href="https://www.youtube.com/user/JBProfCorsiEcm"><i className='fab fa-xl translate1px fa-youtube ms-4'></i></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap text-left lg:text-left mt-10">
                        <div className="w-full lg:w-1/2 px-4">
                            <h5 className="text-xl mt-4 mb-2 text-white">Pagamenti sicuri con PayPal</h5>
                            <img src='/brand/logos/paypal.png' className='w-80 w-auto' />
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <a target='_blank' href="https://www.jbprof.com/images/kiwa_2019.pdf">
                                <h5 className="text-xl mt-4 mb-2 text-white">Certificazione di qualità</h5>
                                <img src='/brand/logos/accredia-kiwa.png' className='h-24 mt-4 w-auto' />
                            </a>
                        </div>
                    </div>

                    <hr className="my-6 opacity-50" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-full px-4 mx-auto text-center">
                            <div className="text-white font-light py-1">
                                <a target="_parent" href='/privacy'>Privacy Policy e condizioni d'uso</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
