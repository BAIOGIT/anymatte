import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import jwtDecode from "jwt-decode";
import CallToActionSection from '../elements/CallToAction';
import { useTable, useSortBy } from 'react-table';

import Button from '../components/ui/button';

const FileManager = () => {
    const axios = useAxios();

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("authTokens");
    let user_id;

    if (token) {
        try {
            const decode = jwtDecode(token);
            user_id = decode.id;
        } catch (error) {
            console.error("Failed to decode token:", error);
        }
    }

    useEffect(() => {
        const getUserFiles = async () => {
            try {
                const response = await axios.get(`/get-files/${user_id}/`, {
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
                setFiles(Object.values(response.data)); // Convert object to array
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user files:', error);
                setError('Error fetching files');
                setLoading(false);
            }
        };

        if (user_id) {
            getUserFiles();
        }
    }, [user_id, axios, token]);

    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatFileName = (value) => {
        return (
            <div className="font-bold">
                <span className="font-bold">{value}</span>
            </div>
        );
    };

    const ActionCell = ({ value, row }) => {
        const baseUrl = process.env.REACT_APP_DJANGO_IP_REMOTE || '';
        const fullUrl = `https://${baseUrl}:9777/media/${value}`;
    
        return (
            <>
                {row.original.status === 'Done' ? (
                    <Button 
                        className="w-full text-lightTheme-text font-medium p-2 px-2 rounded hover:bg-darkTheme-primary dark:hover:bg-lightTheme-primary hover:text-darkTheme-text dark:hover:text-lightTheme-text "
                    >
                        <a href={fullUrl} download target="_blank" className="">
                            Download
                        </a>
                    </Button>
                    // <a href={fullUrl} download className="text-green-600 dark:text-green-400 hover:underline">
                    //     Download
                    // </a>
                ) : (
                    <Button 
                        disabled
                        className="w-full opacity-50 text-lightTheme-text font-medium p-2 px-2 rounded"
                    >
                        <a className="">
                            Processing
                        </a>
                    </Button>
                    // <span className="text-red-600 dark:text-red-400">Not ready</span>
                )}
            </>
        );
    };
    
    const columns = React.useMemo(() => [
        {
            Header: 'Uploaded At',
            accessor: 'uploaded_at',
            Cell: ({ value }) => formatDateTime(value), // Format the datetime value
        },
        {
            Header: 'File Name',
            accessor: 'file_name', // accessor is the key in the data,
            Cell: ({ value }) => formatFileName(value), // Make the filename bold
        },
        // {
        //     Header: 'Status',
        //     accessor: 'status',
        // },
        // {
        //     Header: 'Processed At',
        //     accessor: 'processed_at',
        // },
        // {
        //     Header: 'Error Message',
        //     accessor: 'error_message',
        // },
        // {
        //     Header: 'Paid',
        //     accessor: 'paid',
        //     Cell: ({ value }) => (value ? 'Paid' : 'Not Paid'),
        // },
        {
            Header: 'Status',
            accessor: 'url',
            Cell: ActionCell,
        },
    ], []);

    const data = React.useMemo(() => files, [files]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        { columns, data },
        useSortBy
    );

    return (
        <>
            <div className="pt-2 pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Your Files</h2>
                        {loading && <p className="text-gray-500 dark:text-gray-400 mb-4">Loading files...</p>}
                        {/* {error && <p className="text-red-500 dark:text-red-400">{error}</p>} */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-lightTheme-separator dark:border-darkTheme-separator" {...getTableProps()}>
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    className="py-3 px-4 border-b border-lightTheme-separator dark:border-darkTheme-separator text-left text-sm font-semibold text-black dark:text-white"
                                                >
                                                    {column.render('Header')}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedAsc
                                                                ? ' 🔽'
                                                                : ' 🔼'
                                                            : ''}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map(row => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()} className="hover:bg-[#dddddd] dark:hover:bg-[#242424]">
                                                {row.cells.map(cell => (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="py-3 px-4 border-b border-lightTheme-separator dark:border-darkTheme-separator text-sm text-black dark:text-white"
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {!loading && !error && files.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400 mt-4">No files found.</p>
                        )}
                    </div>
                </div>
            </div>

            <CallToActionSection />
        </>
    );
};

export default FileManager;
