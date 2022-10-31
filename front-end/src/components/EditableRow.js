import React, { useState } from "react";
import { FaTimesCircle, FaSave } from "react-icons/fa";

const EditRow = ({ result, setEditRow, updateResult }) => {
    const [charge, setCharge] = useState(result.charge);
    const [moa, setMoa] = useState(result.moa);
    const [vel1, setVel1] = useState(result.velocity[0].velocity_num);
    const [vel2, setVel2] = useState(result.velocity[1].velocity_num);
    const [vel3, setVel3] = useState(result.velocity[2].velocity_num);

    //sends the data to the API to update the database
    const updateRow = async (data) => {
        try {
            await fetch("/api/gun/update_row/", {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.log(error);
        }
    };

    //called when the save button is used
    //updateRow updates the database, updateResult updates the state
    const saveResult = async (id) => {
        const newResult = {
            test_id: result.test_id,
            charge,
            moa,
            velocity: [],
        };
        newResult.velocity.push(
            { velocity_id: result.velocity[0].velocity_id, velocity_num: vel1 },
            { velocity_id: result.velocity[1].velocity_id, velocity_num: vel2 },
            { velocity_id: result.velocity[2].velocity_id, velocity_num: vel3 }
        );

        updateRow(newResult);
        updateResult(newResult);
        setEditRow(null);
    };

    return (
        <>
            <td className="border p-2">
                <input
                    className="w-full h-full border border-2 rounded-sm border-gray-200 text-black"
                    type="number"
                    value={charge}
                    onChange={(e) => setCharge(parseFloat(e.target.value))}
                />
            </td>
            <td className="border p-2">
                <input
                    className="w-full h-full border border-2 rounded-sm border-gray-200 text-black"
                    type="number"
                    value={moa}
                    onChange={(e) => setMoa(parseFloat(e.target.value))}
                />
            </td>

            <td className="border p-2">
                <input
                    className="w-full h-full border border-2 rounded-sm border-gray-200 text-black"
                    type="number"
                    value={vel1}
                    onChange={(e) => setVel1(parseInt(e.target.value))}
                />
            </td>
            <td className="border p-2">
                <input
                    className="w-full h-full border border-2 rounded-sm border-gray-200 text-black"
                    type="number"
                    value={vel2}
                    onChange={(e) => setVel2(parseInt(e.target.value))}
                />
            </td>
            <td className="border p-2">
                <input
                    className="w-full h-full border border-2 rounded-sm border-gray-200 text-black"
                    type="number"
                    value={vel3}
                    onChange={(e) => setVel3(parseInt(e.target.value))}
                />
            </td>
            <td className="border p-2">{result.test_id}</td>
            <td className="border p-2">{result.test_id}</td>
            <td className="border">
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="mr-1 bg-green-600 hover:bg-green-700 text-lg text-white font-bold px-0.5 py-1 rounded"
                        onClick={() => saveResult(result.test_id)}
                    >
                        <FaSave />
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-lg text-white font-bold px-0.5 py-1 rounded"
                        type="button"
                        onClick={() => setEditRow(null)}
                    >
                        <FaTimesCircle />
                    </button>
                </div>
            </td>
        </>
    );
};

export default EditRow;
