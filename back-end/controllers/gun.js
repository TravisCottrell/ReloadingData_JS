const db = require("../db");

//retrieves all of the data related to a single gun
const getSingleGun = async (req, res) => {
    const gun = await db.query(
        `SELECT
        json_agg(
            json_build_object(
                'gun', guns.gun,
                'bullets', bullets
            )
        ) guns
    FROM guns
    JOIN (
        SELECT
            gun_id,
            json_agg(
                json_build_object(
                    'bullet_id', bullets.bullet_id,
                    'powder', bullets.powder,
                    'primer', bullets.primer,
                    'name', bullets.bullet,
                    'results', testResult
                )
            ) bullets
        FROM bullets
        LEFT JOIN (
            SELECT
                bullet_id,
                json_agg(
                    json_build_object(
                        'test_id', testresult.test_id,
                        'moa', testresult.moa,
                        'charge', testresult.charge,
                        'velocity', velocity
                    )
                    ORDER BY testresult.test_id
                ) testresult
            FROM testresult
                LEFT JOIN (
                    SELECT
                        test_id,
                        json_agg(
                            json_build_object(
                                'velocity_id', velocity.velocity_id,
                                'velocity_num', velocity.velocity
                            )
                        ) velocity
                    FROM velocity
                    GROUP BY 1
                  ) velocity ON velocity.test_id = testresult.test_id
            GROUP BY 1
            
          ) testresult ON testresult.bullet_id = bullets.bullet_id
        GROUP BY gun_id
    ) bullets ON guns.gun_id = bullets.gun_id
    where guns.gun_id = $1;`,
        [req.params.id]
    );

    res.status(200).json({ gun: gun.rows[0].guns });
};

const getBullet = async (req, res) => {
    const bullet = await db.query("SELECT * from bullets where bullet_id=$1", [
        req.params.id,
    ]);
    res.status(200).json({ bullet: bullet.rows[0] });
};

const createBullet = async (req, res) => {
    const bullet = await db.query(
        "INSERT INTO bullets (bullet, gun_id, powder, primer) VALUES (0,$1,0,0) returning *;",
        [req.params.id]
        //[req.body.bullet, req.params.id, req.body.powder, req.body.primer]
    );
    res.status(201).json({ bullet: bullet });
};

const deleteBullet = async (req, res) => {
    await db.query("DELETE FROM bullets WHERE bullet_id=$1;", [req.params.id]);
    res.status(200).send();
};

const editBullet = async (req, res) => {
    await db.query(
        "UPDATE bullets SET bullet=$1, powder=$2, primer=$3 WHERE bullet_id=$4;",
        [req.body.bullet, req.body.powder, req.body.primer, req.params.id]
    );
    res.status(200).send();
};

//creates an entire frontend table rows worth of default data for the database
const createRowData = async (req, res) => {
    const test_id = await db.query(
        "INSERT INTO testResult (bullet_id,charge,moa) VALUES ($1, 0, 0) RETURNING *;",
        [req.params.id]
    );
    const result = test_id.rows[0];

    result.velocity = [];
    for (let i = 0; i < 3; i++) {
        const velocity = await db.query(
            "INSERT INTO velocity (test_id,velocity) VALUES ($1, 0) RETURNING *;",
            [result.test_id]
        );

        result.velocity.push({
            velocity_id: velocity.rows[0].velocity_id,
            test_id: velocity.rows[0].test_id,
            velocity: velocity.rows[0].velocity,
        });
    }
    res.status(201).json({ result });
};

const updateRowData = async (req, res) => {
    const result = req.body;
    await db.query(
        "UPDATE testResult SET charge=$1, moa=$2 WHERE test_id = $3;",
        [req.body.charge, req.body.moa, req.body.test_id]
    );

    for (vel of req.body.velocity) {
        await db.query(
            "UPDATE velocity SET velocity=$1 WHERE velocity_id=$2;",
            [vel.velocity_num, vel.velocity_id]
        );
    }

    res.status(200).send();
};

const deleteResult = async (req, res) => {
    await db.query("DELETE FROM testResult WHERE test_id=$1;", [req.params.id]);
    res.status(200).send();
};

module.exports = {
    getSingleGun,
    getBullet,
    createBullet,
    deleteBullet,
    editBullet,
    createRowData,
    updateRowData,
    deleteResult,
};
