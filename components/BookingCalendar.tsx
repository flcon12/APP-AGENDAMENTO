import React, { useState } from 'react';

interface BookingCalendarProps {
    onDateSelect: (date: Date) => void;
}

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
        days.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    
    const handleSelect = (day: Date) => {
        const isPast = day < today;
        const isSaturday = day.getDay() === 6;
        if (isPast || !isSaturday) return;
        onDateSelect(day);
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={prevMonth} 
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Mês anterior"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-3xl font-bold text-center capitalize">
                    {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                </h2>
                <button 
                    onClick={nextMonth} 
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Próximo mês"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-400 mb-2">
                {WEEK_DAYS.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const isPast = day < today;
                    const isToday = isSameDay(day, new Date());
                    const isSaturday = day.getDay() === 6; // 6 = Sábado
                    
                    let baseClasses = "w-full aspect-square flex items-center justify-center rounded-full transition-colors duration-200 font-semibold";
                    let stateClasses = "";

                    if (!isCurrentMonth) {
                        stateClasses = "text-gray-700 opacity-50";
                    } else if (isPast || !isSaturday) {
                        stateClasses = "text-gray-600 cursor-not-allowed opacity-60";
                        if(isPast && isSaturday) {
                           stateClasses += " line-through";
                        }
                    } else { // É um sábado futuro no mês corrente
                        stateClasses = "hover:bg-red-700 hover:text-white cursor-pointer bg-gray-700";
                         if (isToday) {
                            stateClasses += " border-2 border-red-600";
                        }
                    }

                    return (
                        <button 
                            key={index} 
                            className={`${baseClasses} ${stateClasses}`} 
                            onClick={() => handleSelect(day)}
                            disabled={!isCurrentMonth || isPast || !isSaturday}
                            aria-label={`Selecionar dia ${day.getDate()}`}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
             <p className="text-center text-gray-400 mt-4 text-sm">
                * Agendamentos disponíveis apenas para os sábados.
            </p>
        </div>
    );
};

export default BookingCalendar;