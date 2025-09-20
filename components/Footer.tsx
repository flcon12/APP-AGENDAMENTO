import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900/50 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <Logo />
                        <p className="mt-4 text-gray-400">
                            AV WALDEMAR LOPES FERRAZ, 26 – CENTRO, OLÍMPIA SP
                            <br />
                            CEP 15400-090
                        </p>
                    </div>
                    <div className="md:col-span-2 flex flex-col items-center md:items-end">
                        <h3 className="text-xl font-semibold">Mantenha-se Atualizado</h3>
                        <p className="mt-2 text-gray-400 max-w-md text-center md:text-right">
                            Assine nossa newsletter para receber as últimas notícias e ofertas.
                        </p>
                        <form className="mt-4 flex w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="footer-email" className="sr-only">Email</label>
                            <input
                                id="footer-email"
                                type="email"
                                placeholder="Digite seu e-mail"
                                aria-label="Endereço de e-mail para newsletter"
                                className="w-full bg-gray-800 text-white border border-gray-700 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                            <button
                                type="submit"
                                aria-label="Inscrever-se na newsletter"
                                className="bg-red-600 text-white font-bold px-6 py-2 rounded-r-md hover:bg-red-700 transition-colors duration-300"
                            >
                                Inscrever
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Fight Zone 017. Todos os Direitos Reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
