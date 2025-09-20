import React, { useState } from 'react';
import { generateWorkoutIdea } from '../services/geminiService';

const WorkoutGenerator: React.FC = () => {
    const [workoutIdea, setWorkoutIdea] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateWorkout = async () => {
        setIsLoading(true);
        setWorkoutIdea('');
        try {
            const idea = await generateWorkoutIdea();
            setWorkoutIdea(idea);
        } catch (error) {
            console.error(error);
            setWorkoutIdea('Ocorreu um erro ao gerar a ideia de treino. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8 border-t border-gray-700 pt-6">
            <h3 className="text-2xl font-semibold mb-4 text-center">Prepare-se para sua Sessão!</h3>
            <p className="text-center text-gray-400 mb-4">Clique abaixo para receber uma sugestão de aquecimento gerada por IA.</p>
            <button
                onClick={handleGenerateWorkout}
                disabled={isLoading}
                className="bg-red-600 text-white font-bold px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {isLoading ? 'Gerando...' : '✨ Gerar Aquecimento com IA'}
            </button>
            {workoutIdea && (
                <div className="mt-6 p-4 bg-gray-900 rounded-lg text-left whitespace-pre-wrap font-mono text-sm text-gray-300 border border-gray-700">
                    <p className="font-sans font-bold text-base text-white mb-3">Sugestão de Aquecimento:</p>
                    {workoutIdea}
                </div>
            )}
        </div>
    );
};

export default WorkoutGenerator;
