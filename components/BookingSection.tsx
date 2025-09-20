import React, { useState, useMemo, useCallback } from 'react';
import type { TimeSlot, BookingDetails } from '../types';
import PricingCard from './PricingCard';
import BookingCalendar from './BookingCalendar';
import TimeSlots from './TimeSlots';
import ConfirmationForm from './ConfirmationForm';
import WorkoutGenerator from './WorkoutGenerator';

type BookingStep = 'selectDate' | 'selectTime' | 'enterDetails' | 'confirmed';

// Horário fixo para agendamentos aos sábados
const SATURDAY_TIME_SLOT: TimeSlot = { time: '09:00', totalSpots: 4, availableSpots: 4 };

const BookingSection: React.FC = () => {
    const [step, setStep] = useState<BookingStep>('selectDate');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

    const availableTimeSlots = useMemo(() => {
        // Para agendamentos, o único horário disponível é Sábado às 09:00.
        // A disponibilidade de vagas pode ser aleatória para simulação.
        if (!selectedDate) return [];
        return [{
            ...SATURDAY_TIME_SLOT,
            availableSpots: Math.floor(Math.random() * 5) // Simula de 0 a 4 vagas disponíveis
        }];
    }, [selectedDate]);

    const handleDateSelect = useCallback((date: Date) => {
        setSelectedDate(date);
        setStep('selectTime');
    }, []);

    const handleTimeSelect = useCallback((timeSlot: TimeSlot) => {
        setSelectedTimeSlot(timeSlot);
        setStep('enterDetails');
    }, []);

    const handleBookingConfirm = useCallback((details: Omit<BookingDetails, 'date' | 'timeSlot'>) => {
        if (selectedDate && selectedTimeSlot) {
            const fullDetails: BookingDetails = {
                ...details,
                date: selectedDate,
                timeSlot: selectedTimeSlot,
            };
            setBookingDetails(fullDetails);
            setStep('confirmed');
            // Aqui você normalmente enviaria os dados do agendamento para o seu backend
            console.log('Agendamento Confirmado:', fullDetails);
        }
    }, [selectedDate, selectedTimeSlot]);
    
    const handleReset = () => {
        setStep('selectDate');
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setBookingDetails(null);
    };

    const renderStepContent = () => {
        switch (step) {
            case 'selectDate':
                return <BookingCalendar onDateSelect={handleDateSelect} />;
            case 'selectTime':
                return <TimeSlots date={selectedDate!} slots={availableTimeSlots} onTimeSelect={handleTimeSelect} onBack={() => setStep('selectDate')} />;
            case 'enterDetails':
                return <ConfirmationForm date={selectedDate!} timeSlot={selectedTimeSlot!} onConfirm={handleBookingConfirm} onBack={() => setStep('selectTime')} />;
            case 'confirmed':
                return (
                    <div className="text-center bg-gray-800 p-6 sm:p-8 rounded-lg border border-green-500 shadow-lg shadow-green-500/10">
                        <h2 className="text-4xl font-bold text-green-400 mb-4">Agendamento Confirmado!</h2>
                        <p className="text-lg text-gray-300">Uma confirmação foi enviada para <span className="font-semibold text-red-400">{bookingDetails?.email}</span>.</p>
                        <div className="my-6 text-left inline-block bg-gray-900/50 p-6 rounded-md">
                           <p><strong>Nome:</strong> {bookingDetails?.name}</p>
                           <p><strong>Data:</strong> {bookingDetails?.date.toLocaleDateString('pt-BR')}</p>
                           <p><strong>Horário:</strong> {bookingDetails?.timeSlot.time}</p>
                        </div>
                        
                        <WorkoutGenerator />

                        <button onClick={handleReset} className="mt-8 text-red-500 hover:text-red-400 font-semibold transition-colors">
                            Agendar Outra Aula
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                <PricingCard 
                    title="ALUNOS ZERO17" 
                    price={40} 
                    priceSubtitle="AULA AVULSA"
                    features={[
                        "Turmas exclusivas (Máximo 4 alunos)",
                        "Metodologia Fight Zone 017",
                        "Técnica + Condicionamento com segurança",
                        "Ambiente Premium sem filas"
                    ]}
                />
                 <PricingCard 
                    title="NÃO ALUNOS" 
                    price={60} 
                    priceSubtitle="AULA AVULSA"
                    features={[
                        "Primeiro contato com a metodologia",
                        "Acompanhamento próximo do coach",
                        "Estrutura e equipamentos de alto nível",
                        "Convite para migrar para 017"
                    ]}
                    highlight
                />
            </div>

            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-wider">
                    APENAS 4 ALUNOS POR TURMA
                </h2>
                <p className="text-red-600 text-2xl mt-2 font-semibold">GARANTA SUA VAGA:</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-8 shadow-2xl shadow-black/30 min-h-[400px]">
                <div key={step} className="animate-fade-in">
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
};

export default BookingSection;