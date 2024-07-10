"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from '../components/Sidebar';


const MyComponent = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');
    const [selectedTeam, setSelectedTeam] = useState(null);
    const router = useRouter();

    const instance = axios.create({
        baseURL: 'https://api-basketball.p.rapidapi.com/',
        headers: {
            'x-rapidapi-host': 'api-basketball.p.rapidapi.com',
            'x-rapidapi-key': '4164a9c241mshd079f20eb5a2479p1215e3jsn726445616dfe'
        }
    });

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = () => {
        instance.get('teams?league=12&season=2019-2020')
            .then(res => {
                setTeams(res.data.response);
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    router.push('/login?message=' + encodeURIComponent('Anda Belum Login!'));
                } else {
                    setError({ message: 'Terjadi kesalahan saat memuat daftar tim.' });
                }
            });
    };

    const showTeamDetails = (team) => {
        setSelectedTeam(team);
    };

    const closePopup = () => {
        setSelectedTeam(null);
    };

    return (
        <div>
            <Sidebar />
            <div className="relative overflow-x-auto">
                <div className="block w-11/12 text-white rounded-lg shadow">
                    <div className="m-5 pb-10 pt-10">
                        <div className="flex justify-between">
                            <h5 className="mb-1 ml-5 text-3xl font-medium">Basketball Teams</h5>
                            <Link href="/team/add" legacyBehavior>
                                <a>
                                    <button className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg flex items-center">
                                        <span className="text-white">Add Team</span>
                                    </button>
                                </a>
                            </Link>
                        </div>

                        {success && (
                            <div role="alert">
                                <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                                    Success!
                                </div>
                                <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                                    {success}
                                </div>
                            </div>
                        )}

                        {error.message && (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Error!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    {error.message}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-center">
                            <div className="relative overflow-x-auto flex w-full mt-3 flex items-center shadow-md rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">No</th>
                                            <th scope="col" className="px-6 py-3">Country</th>
                                            <th scope="col" className="px-6 py-3">Name</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teams.map((team, index) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={team.id}>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index + 1}
                                                </th>
                                                <td className="px-6 py-4 flex items-center">
                                                    <img src={team.country.flag} alt={team.country.name} className="w-6 h-4 mr-2" />
                                                    {team.country.name}
                                                </td>
                                                <td className="px-6 py-4 flex items-center">
                                                    <img src={team.logo} alt={team.name} className="w-6 h-6 mr-2" />
                                                    {team.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button 
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                        onClick={() => showTeamDetails(team)}
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
                    </div>
                </div>
            </div>
            
            {selectedTeam && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8">
                        <h2 className="text-xl font-bold mb-4">Team Details</h2>
                        <p><strong>Name:</strong> {selectedTeam.name}</p>
                        <p><strong>Country:</strong> {selectedTeam.country.name}</p>
                        <p><strong>City:</strong> {selectedTeam.city}</p>
                        <p><strong>Founded:</strong> {selectedTeam.founded}</p>
                        <p><strong>Stadium:</strong> {selectedTeam.stadium}</p>
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
    );
};

export default MyComponent;
