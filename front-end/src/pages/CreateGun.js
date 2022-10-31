import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const CreateGun = () => {
    const [gunName, setGunName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch("/api/guns/createGun", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ gun: gunName }),
            });
        } catch (error) {
            console.log(error);
        }

        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center pt-10 h-screen">
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="inline-gun-name"
                        >
                            Gun
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-gun-name"
                            type="text"
                            placeholder="enter gun"
                            value={gunName}
                            onChange={(e) => setGunName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Create Gun
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateGun;
