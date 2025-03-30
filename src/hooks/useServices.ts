import { useEffect, useState } from "react";

// Hook per le chiamate get al montaggio dei componenti
export function useServices<T>(url: string) {

    // Stati del componente che gestiscono i dati della chiamata
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Funzione per eseguire la chiamate
    const fetchData = async (url: string) => {
        setIsLoading(true);
        try {
            // Simulo un po' di ritardo
            await new Promise(resolve => setTimeout(resolve, 1000));
            const fetchUrl = `http://localhost:2000${url}`;
            const headers = { 'Content-Type': 'application/json' };
            const options: RequestInit = { method: 'GET', headers };
            const response = await fetch(fetchUrl, options);
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