import React, { useState } from 'react';
import type { TimeSlot, BookingDetails } from '../types';

interface ConfirmationFormProps {
    date: Date;
    timeSlot: TimeSlot;
    onConfirm: (details: Omit<BookingDetails, 'date' | 'timeSlot'>) => void;
    onBack: () => void;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ date, timeSlot, onConfirm, onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !phone.trim()) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        // Simple email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }
        setError('');
        onConfirm({ name, email, phone });
    };

    return (
        <div>
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="text-red-500 hover:text-red-400 transition-colors mr-4 font-semibold text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Voltar
                </button>
                <h2 className="text-3xl font-bold">Confirme sua Reserva</h2>
            </div>
            
            <div className="bg-gray-800 border-l-4 border-red-600 rounded-lg p-6 mb-8 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Detalhes da sua Aula:</h3>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-xl">
                            {date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                    </div>
                    <div className="flex items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-xl font-bold">{timeSlot.time}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Endereço de E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Número de Telefone</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(XX) XXXXX-XXXX"
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                        required
                    />
                </div>
                {error && <p className="text-red-400 text-center text-sm font-semibold">{error}</p>}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white font-bold text-lg py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-600 transition-all duration-300 transform hover:scale-105"
                    >
                        Confirmar e Agendar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmationForm;
