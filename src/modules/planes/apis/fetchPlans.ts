const API_PLANS = process.env.REACT_APP_API_PLANS;

console.log(API_PLANS);

export const fetchPlans = async () => {
    try {
        const response = await fetch(API_PLANS!);
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
