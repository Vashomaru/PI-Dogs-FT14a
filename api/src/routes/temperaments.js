require("dotenv").config();
const axios = require("axios").default;
const { Router } = require("express");
const { API_KEY } = process.env;
const { Temperament } = require("../db");
const router = Router();

router.get("/temperament", async (req, res) => {
    try {
        const temperamentList = await Temperament.findAll();

        if (temperamentList.length === 0) {
            const { data } = await axios.get(
                `https://api.thedogapi.com/v1/breeds?apikey=${API_KEY}`
            );

            const auxArray = ["Unknown"];
            
            for (let i = 0; i < data.length; i++) {
                if (data[i].temperament) {
                    let aux = data[i].temperament.split(",");

                    for (let j = 0; j < aux.length; j++) {
                        auxArray.push(aux[j].trim());
                    }
                }
            }

            const auxSet = new Set(auxArray.sort());

            for (const item of auxSet) {
                const aux2 = await Temperament.findOrCreate({
                    where: {
                        name: item,
                    },
                });
                temperamentList.push(aux2[0]);
            }
        }

        res.json(temperamentList); 
    } catch (err) {
        res.send(err);
        return err;
    }
});

module.exports = router;
