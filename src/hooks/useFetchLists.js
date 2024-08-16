import { useState, useEffect } from 'react';


const useFetchLists = (apiKey, sessionId) => {
    const [lists, setLists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchLists = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/lists?api_key=${apiKey}&session_id=${sessionId}`);
            const data = await response.json();
            console.log(data);
            setLists(data.results);
            setLoading(false);
        } catch (error) {
            setError('Error fetching lists');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLists();
    }, [apiKey, sessionId]);

    return { lists, error, loading, refetch: fetchLists };
}

export default useFetchLists;