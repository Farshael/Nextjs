"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar';

const MyComponent = () => {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchLeagues();
    }, []);

    const fetchLeagues = async () => {
        try {
            const response = await axios.get('https://api-basketball.p.rapidapi.com/leagues', {
                headers: {
                    'x-rapidapi-host': 'api-basketball.p.rapidapi.com',
                    'x-rapidapi-key': '4164a9c241mshd079f20eb5a2479p1215e3jsn726445616dfe'
                }
            });
            console.log('Leagues Data:', response.data.response);
            setLeagues(response.data.response);
        } catch (error) {
            console.error('Error fetching leagues:', error);
            setErrorMessage('Error fetching leagues. Please try again later.');
        }
    };

    const fetchSeasons = async (leagueId) => {
        try {
            const response = await axios.get(`https://api-basketball.p.rapidapi.com/seasons?league=${leagueId}`, {
                headers: {
                    'x-rapidapi-host': 'api-basketball.p.rapidapi.com',
                    'x-rapidapi-key': '4164a9c241mshd079f20eb5a2479p1215e3jsn726445616dfe'
                }
            });
            console.log('Seasons Data:', response.data);
            setSeasons(response.data.response);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.error('Rate limit exceeded. Retrying in 60 seconds.');
                setTimeout(() => fetchSeasons(leagueId), 60000); // Retry after 60 seconds
            } else {
                console.error('Error fetching seasons:', error);
                setErrorMessage('Error fetching seasons. Please try again later.');
            }
        }
    };

    const showLeagueDetails = (league) => {
        setSelectedLeague(league);
        fetchSeasons(league.id);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setSelectedLeague(null);
        setSeasons([]);
        setPopupVisible(false);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 overflow-x-auto p-5">
                <div className="block w-full mx-auto text-white rounded-lg shadow">
                    <div className="m-5 pb-10 pt-10">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                                <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 bg-blue-500">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Country
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-blue-500">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leagues.map((league) => (
                                        <tr className="bg-blue-600 border-b border-blue-400" key={league.id}>
                                            <td className="px-6 py-4 bg-blue-500">
                                                <div className="flex items-center">
                                                    <img src={league.logo} alt={league.name} className="w-6 h-6 mr-2" />
                                                    {league.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {league.country.name}
                                            </td>
                                            <td className="px-6 py-4 bg-blue-500">
                                                {league.type}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                    onClick={() => showLeagueDetails(league)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="text-red-500">
                            {errorMessage}
                        </div>
                    )}

                    {selectedLeague && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                            <div className="bg-gray-800 text-white rounded-lg p-8">
                                <div className="flex items-center mb-4">
                                    <img src={selectedLeague.logo} alt={selectedLeague.name} className="w-8 h-8 mr-2" />
                                    <h2 className="text-xl font-bold">{selectedLeague.name}</h2>
                                </div>
                                <div className="flex items-center mb-4">
                                    <p>{selectedLeague.country.name}</p>
                                </div>
                                <div className="mb-4">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Season</th>
                                                <th scope="col" className="px-6 py-3">Start</th>
                                                <th scope="col" className="px-6 py-3">End</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {seasons.length === 0 ? (
                                                <tr>
                                                    <td className="px-6 py-4" colSpan="3">No seasons available</td>
                                                </tr>
                                            ) : (
                                                seasons.map((season, index) => (
                                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                        <td className="px-6 py-4">
                                                            {season.name}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {season.start_date}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {season.end_date}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <button
                                    className="mt-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                                    onClick={closePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
