import React, { useEffect, useState } from "react";

import { useLocation, Link } from "react-router-dom";

const Guns = () => {
    const [guns, setGuns] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/guns");
                const data = await response.json();
                setGuns(data.guns);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <p>LOADING</p>;
    }

    return (
        <>
            <div className="flex flex-col mt-20 mx-auto h-screen w-1/4">
                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 w-full rounded"
                >
                    <Link to={"/guns/createGun"}>add Gun</Link>
                </button>
                <div className=" w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {guns.map((item) => {
                        return (
                            <Link
                                key={item.gun_id}
                                to={`/gun/${item.gun_id}`}
                                className="flex justify-center block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                            >
                                {item.gun}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Guns;
