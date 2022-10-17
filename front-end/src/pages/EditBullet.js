import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const EditBullet = () => {
    const [bullet, setBullet] = useState("");
    const [powder, setPowder] = useState("");
    const [primer, setPrimer] = useState("");
    const [gun_id, setGun_id] = useState();
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/gun/edit_bullet/${id}`);
                const data = await response.json();

                setBullet(data.bullet.bullet);
                setPowder(data.bullet.powder);
                setPrimer(data.bullet.primer);
                setGun_id(data.bullet.gun_id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`/api/gun/edit_bullet/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ bullet, powder, primer }),
            });
        } catch (error) {
            console.log(error);
        }

        navigate(`/gun/${gun_id}`);
    };

    const handleDelete = async () => {
        try {
            await fetch(`/api/gun/delete_bullet/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
            });
        } catch (error) {
            console.log(error);
        }

        navigate(`/gun/${gun_id}`);
    };

    return (
        <div className="flex flex-col items-center justify-center pt-10 h-screen">
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-bullet-name"
                        >
                            Bullet
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-bullet-name"
                            type="text"
                            placeholder="enter bullet"
                            value={bullet}
                            onChange={(e) => setBullet(e.target.value)}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-powder-name"
                        >
                            Powder
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-powder-name"
                            type="text"
                            placeholder="enter Powder"
                            value={powder}
                            onChange={(e) => setPowder(e.target.value)}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-primer-name"
                        >
                            Primer
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-primer-name"
                            type="text"
                            placeholder="enter Primer"
                            value={primer}
                            onChange={(e) => setPrimer(e.target.value)}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-1"
                            type="submit"
                        >
                            Submit
                        </button>
                        <button
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-1"
                            type="button"
                            onClick={() => navigate(`/gun/${gun_id}`)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditBullet;
