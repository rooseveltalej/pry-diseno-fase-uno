import { useEffect, useState } from 'react';

const useFetchLists = (apiKey, sessionId) => {
    const [lists, setLists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchLists = async () => {
        try {
            // Primero, obtener el account_id
            const accountResponse = await fetch(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`);
            const accountData = await accountResponse.json();
            const accountId = accountData.id;

            // Luego, usar el account_id para obtener las listas
            const listsResponse = await fetch(`https://api.themoviedb.org/3/account/${accountId}/lists?api_key=${apiKey}&session_id=${sessionId}`);
            const listsData = await listsResponse.json();

            // Para cada lista, obtener sus items
            const listsWithItems = await Promise.all(
                listsData.results.map(async (list) => {
                    const listDetailsResponse = await fetch(`https://api.themoviedb.org/3/list/${list.id}?api_key=${apiKey}`);
                    const listDetailsData = await listDetailsResponse.json();
                    return { ...list, items: listDetailsData.items };
                })
            );

            setLists(listsWithItems);
            setLoading(false);
        } catch (error) {
            setError('Error fetching lists or items');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLists();
    }, [apiKey, sessionId]);

    return { lists, error, loading, refetch: fetchLists };
}

export default useFetchLists;
