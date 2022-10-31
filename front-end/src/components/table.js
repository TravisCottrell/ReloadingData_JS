import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Row from "./Row";
import EditRow from "./EditableRow";

const Table = ({ bulletData }) => {
    const [bullet, setBullet] = useState(bulletData);

    const [editRow, setEditRow] = useState(null);
    const [deleteRow, setDeleteRow] = useState(null);

    useEffect(() => {}, [bullet]);

    const addResult = async () => {
        try {
            const response = await fetch(
                `/api/gun/create_row/${bullet.bullet_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );
            const data = await response.json();
            addRow(data);
        } catch (error) {
            console.log(error);
        }
    };

    const addRow = ({ result }) => {
        let tempBullet = { ...bullet };
        let tempResults;
        if (tempBullet.results !== null) {
            tempResults = [...tempBullet.results];

            tempResults = [
                ...tempResults,
                {
                    test_id: result.test_id,
                    moa: result.moa,
                    charge: result.charge,
                    velocity: result.velocity,
                },
            ];
        } else {
            tempResults = [
                {
                    test_id: result.test_id,
                    moa: result.moa,
                    charge: result.charge,
                    velocity: result.velocity,
                },
            ];
        }

        tempBullet.results = tempResults;

        setBullet(tempBullet);
    };

    //updates the state after save button is used
    const updateResult = (result) => {
        let tempBullet = { ...bullet };
        let tempResults = [...tempBullet.results];
        const index = tempResults.findIndex(
            (element) => result.test_id === element.test_id
        );
        tempResults[index] = result;
        tempBullet.results = tempResults;

        setBullet(tempBullet);
    };

    //delete result information
    const deleteLocalData = (id) => {
        let tempBullet = { ...bullet };
        let tempResults = [...tempBullet.results];
        tempResults = tempResults.filter((element) => id !== element.test_id);

        tempBullet.results = tempResults;

        setBullet(tempBullet);
    };

    return (
        <>
            <div className=" mb-10 p-6 text-sm font-medium text-white bg-tableBG  rounded-lg  border border-gray-900  ">
                <div className="container mb-4">
                    <div className="flex">
                        <div className="border border-zinc-400 pl-2 flex-initial w-3/12 ">
                            <h2 className="pb-3">Bullet: </h2>
                            <p>{bullet.name}</p>
                        </div>
                        <div className="border border-zinc-400 pl-2 flex-initial w-3/6 ">
                            <h2 className="pb-3">Powder: </h2>
                            <p>{bullet.powder}</p>
                        </div>
                        <div className="border border-zinc-400 pl-2 flex-auto ">
                            <h2 className="pb-3">Primer: </h2>
                            <p>{bullet.primer}</p>
                        </div>
                    </div>
                    <div className="flex  mb-2">
                        <div className="border border-zinc-400 pl-2 flex-initial w-2/12 ">
                            <h2 className="pb-3">OACL: </h2>
                            <p>{bullet.name}</p>
                        </div>
                        <div className="border border-zinc-400 pl-2 flex-initial w-4/12 ">
                            <h2 className="pb-3">Land Length: </h2>
                            <p>{bullet.powder}</p>
                        </div>
                        <div className="border border-zinc-400 pl-2 flex-auto ">
                            <h2 className="pb-3">Land Offset: </h2>
                            <p>{bullet.primer}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                        <Link to={`/gun/edit_bullet/${bullet.bullet_id}`}>
                            Edit Bullet
                        </Link>
                    </button>
                </div>

                <form>
                    <table className="min-h-min min-w-min w-full h-full table-fixed">
                        <thead>
                            <tr>
                                <th className="border border-zinc-400 text-center">
                                    Charge
                                </th>
                                <th className="border border-zinc-400 text-center">
                                    MOA
                                </th>
                                <th className="border border-zinc-400 text-center">
                                    1
                                </th>
                                <th className="border border-zinc-400 text-center">
                                    2
                                </th>
                                <th className="border border-zinc-400 text-center">
                                    3
                                </th>
                                <th className="border border-zinc-400 text-center">
                                    SD
                                </th>
                                <th className="border border-zinc-400 text-center">
                                    ES
                                </th>
                                <th className="border border-zinc-400 text-center"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {bullet.results !== null &&
                                bullet.results.map((result, index) => {
                                    return (
                                        <tr
                                            className="hover:bg-[#383c52]"
                                            key={index}
                                        >
                                            {editRow === result.test_id ? (
                                                <EditRow
                                                    result={result}
                                                    setEditRow={setEditRow}
                                                    updateResult={updateResult}
                                                />
                                            ) : (
                                                <Row
                                                    result={result}
                                                    setEditRow={setEditRow}
                                                    deleteRow={deleteRow}
                                                    setDeleteRow={setDeleteRow}
                                                    deleteLocalData={
                                                        deleteLocalData
                                                    }
                                                />
                                            )}
                                        </tr>
                                    );
                                })}
                            <tr
                                className="border border-zinc-400 hover:bg-[#2a2d3c] bg-[#34374a]"
                                onClick={addResult}
                            >
                                <td>+ New</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
};

export default Table;
