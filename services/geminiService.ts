import { GoogleGenAI } from "@google/genai";

// Inicializa a API com a chave fornecida pelo ambiente.
// Lança um erro se a chave não estiver configurada para evitar falhas silenciosas.
if (!process.env.API_KEY) {
    throw new Error("A variável de ambiente API_KEY não está definida.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gera uma ideia de treino de aquecimento usando a API Gemini.
 * @returns Uma string contendo a sugestão de treino ou uma mensagem de erro.
 */
export const generateWorkoutIdea = async (): Promise<string> => {
    try {
        const prompt = "Gere uma rotina de aquecimento de 15 minutos para uma aula de boxe de alta intensidade. Foque em alongamentos dinâmicos e cardio leve para preparar para movimentos explosivos. Forneça 5-6 exercícios com descrições breves e claras de cada um. Formate a resposta como uma lista simples, usando títulos e marcadores.";
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        if (response.text) {
            return response.text;
        } else {
            return "Não foi possível gerar uma ideia de treino no momento. Por favor, tente novamente mais tarde.";
        }
    } catch (error) {
        console.error("Erro ao chamar a API Gemini:", error);
        return "Falha ao gerar ideia de treino devido a um erro na API. Por favor, verifique o console para mais detalhes.";
    }
};
