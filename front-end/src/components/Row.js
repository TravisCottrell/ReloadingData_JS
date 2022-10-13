import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";

const Row = ({
    result,
    setEditRow,
    setDeleteRow,
    deleteRow,
    deleteLocalData,
}) => {
    const deleteResultDB = async (id) => {
        try {
            await fetch(`/gun/delete_result/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    //called when the save button is used
    //updateRow updates the database, updateResult updates the state
    const deleteResult = async (id) => {
        deleteResultDB(id);
        deleteLocalData(id);
        setDeleteRow(null);
    };

    return (
        <>
            <tr className="hover:bg-[#383c52]">
                <td className="border border-zinc-400 p-2">{result.charge}</td>
                <td className="border border-zinc-400 p-2">{result.moa}</td>

                <td className="border border-zinc-400 p-2">
                    {result.velocity[0].velocity_num || "0"}
                </td>
                <td className="border border-zinc-400 p-2">
                    {result.velocity[1].velocity_num || "0"}
                </td>
                <td className="border border-zinc-400 p-2">
                    {result.velocity[2].velocity_num || "0"}
                </td>
                <td className="border border-zinc-400 p-2">{result.test_id}</td>
                <td className="border border-zinc-400 p-2">{result.test_id}</td>
                <td className="border border-zinc-400">
                    <div className="flex justify-center">
                        {deleteRow === result.test_id ? (
                            <>
                                <button
                                    type="button"
                                    className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 w-2/4 rounded"
                                    onClick={() => deleteResult(result.test_id)}
                                >
                                    Confirm
                                </button>

                                <button
                                    type="button"
                                    className="bg-transparent bg-red-500 hover:bg-red-700 text-red-700 hover:text-white font-bold border border-red-500 hover:border-transparent py-1 w-2/4 rounded"
                                    onClick={() => setDeleteRow(null)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="mr-1 bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold px-0.5 py-1 rounded"
                                    onClick={() => setEditRow(result.test_id)}
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-700 text-lg text-white font-bold px-0.5 py-1 rounded"
                                    onClick={() => setDeleteRow(result.test_id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </>
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Row;
