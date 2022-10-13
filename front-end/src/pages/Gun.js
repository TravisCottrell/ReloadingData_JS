import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Table from "../components/table";

const Gun = () => {
    const [gunData, setGunData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/gun/${id}`);
                const data = await response.json();

                setGunData(data.gun[0]);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {}, [gunData]);

    const addBullet = async () => {
        try {
            const response = await fetch(`/gun/${id}/create_bullet`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
            });

            const data = await response.json();

            const newBullet = data.bullet.rows[0];

            //add a null result to match other result data
            newBullet.results = null;

            let tempGun = { ...gunData };

            let tempBullets = [...tempGun.bullets];

            tempBullets = [...tempBullets, newBullet];
            tempGun.bullets = tempBullets;
            setGunData(tempGun);
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <p>LOADING</p>;
    }

    return (
        <>
            <div className="container max-w-5xl h-screen:auto">
                <h1 className="font-medium leading-tight text-5xl text-white mt-0 mb-2 ">
                    {gunData.gun}
                </h1>
                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-10"
                    onClick={addBullet}
                >
                    add Bullet
                </button>

                {gunData.bullets !== null &&
                    gunData.bullets.map((bullet) => {
                        return (
                            <Table key={bullet.bullet_id} bulletData={bullet} />
                        );
                    })}
            </div>
        </>
    );
};

export default Gun;
