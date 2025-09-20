import React from 'react';
import type { TimeSlot } from '../types';

interface TimeSlotsProps {
    date: Date;
    slots: TimeSlot[];
    onTimeSelect: (slot: TimeSlot) => void;
    onBack: () => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ date, slots, onTimeSelect, onBack }) => {
    return (
        <div>
             <div className="flex items-center mb-6">
                <button onClick={onBack} className="text-red-500 hover:text-red-400 transition-colors mr-4 font-semibold text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Voltar
                </button>
                <h2 className="text-3xl font-bold">
                    Horários para {date.toLocaleDateString('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {slots.map((slot) => {
                    const isAvailable = slot.availableSpots > 0;
                    const spotsRatio = slot.availableSpots / slot.totalSpots;
                    let availabilityColor = 'bg-green-500';
                    if (spotsRatio <= 0.5 && spotsRatio > 0) availabilityColor = 'bg-yellow-500';
                    if (spotsRatio === 0) availabilityColor = 'bg-red-600';

                    return (
                        <button
                            key={slot.time}
                            onClick={() => isAvailable && onTimeSelect(slot)}
                            disabled={!isAvailable}
                            aria-label={isAvailable ? `Agendar às ${slot.time}` : `Horário das ${slot.time} esgotado`}
                            className={`p-4 border rounded-lg text-center transition-all duration-200 group
                                ${isAvailable ? 'border-gray-700 bg-gray-800 hover:border-red-600 hover:bg-gray-700/50 cursor-pointer' : 'border-gray-800 bg-gray-800/50 text-gray-600 cursor-not-allowed'}`}
                        >
                            <div className="text-2xl font-bold group-hover:text-red-500 transition-colors">{slot.time}</div>
                            <div className="text-sm mt-2">
                                {isAvailable ? `${slot.availableSpots} vagas restantes` : 'Esgotado'}
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-1.5 mt-3">
                                <div className={`${availabilityColor} h-1.5 rounded-full`} style={{ width: `${spotsRatio * 100}%` }}></div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {slots.length === 0 && (
                <p className="text-center text-gray-400 py-8">Nenhum horário disponível para este dia. Por favor, selecione outra data.</p>
            )}
        </div>
    );
};

export default TimeSlots;
