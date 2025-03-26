import { useEffect, useState } from "react";

interface Appointments {
    id: string;
    servicesName: string;
    apptStartTime: string;
}

interface ApptBooked {
    id: string;
    serviceName: string;
    serviceId: number;
    apptStartTime: string;
    email: string;
    name: string;
    make: string;
    model: string;
    modelYear: string;
}

// Questo hook è generico quindi gestisce tutte e tre le chiamate
export function useServices<T>(url: string) {

    // Stati del componente che gestiscono i dati della chiamata
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Funzione per eseguire la chiamate
    const fetchData = async (url: string) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const response = await fetch(`http://localhost:2000${url}`);
            if (!response.ok) {
                const errorMessage = await response.text();
                throw errorMessage;
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(String(error))
        } finally {
            setIsLoading(false)
        }
    }

    // Chiamo la funzione alla ricezione dell'url
    useEffect(() => {
        if (url) fetchData(url)
    }, [url])

    return { data, isLoading, error };
}