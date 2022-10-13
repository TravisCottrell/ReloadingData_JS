const db = require("../db");

const getAllGuns = async (req, res) => {
    const results = await db.query("select * from guns;");
    res.status(200).json({ guns: results.rows });
};

const createGun = async (req, res) => {
    const response = await db.query(
        "INSERT INTO guns (gun) VALUES ($1) returning *;",
        [req.body.gun]
    );
    const gun = response.rows[0];

    await db.query(
        "INSERT INTO bullets (bullet, gun_id, powder, primer) VALUES (0,$1,0,0) returning *;",
        [gun.gun_id]
        //[req.body.bullet, req.params.id, req.body.powder, req.body.primer]
    );
    res.status(201).send();
};

const getSingleGun = async (req, res) => {
    const gun = await db.query("select * from guns where gun_id = $1", [
        req.params.id,
    ]);
    res.status(200).json({ gun: gun.rows });
};

module.exports = {
    getAllGuns,
    getSingleGun,
    createGun,
};
