require("dotenv").config();
const axios = require("axios").default;
const { Router } = require("express");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const router = Router();

const regexUUID = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );



async function getDogs(dogName){
    try {
        if (dogName) {
            const dbResult = await Dog.findAll({
              where: {
                name: {
                  [Op.like]: `%${dogName}%`,
                },
              },
              attributes: ["name", ["image", "background_image"], "rating", "id"],
              include: [
                {
                  model: Genre,
                },
              ],
            });
      
            const apiResult = await axios.get(
              `https://api.rawg.io/api/games?key=${API_KEY}&search=${dogName}`
            );
      
            const filteredApiResult = apiResult.data.results.map((element) => {
              const { name, background_image, genres, rating, id, ...rest } = element;
              return { name, background_image, genres, rating, id };
            });
      
            const response = dbResult.concat(filteredApiResult);
            return response;
          } 
          
          else {
            const dbResult = await Dog.findAll({
              attributes: ["name", ["image", "background_image"], "rating", "id"],
              include: [
                {
                  model: Genre,
                },
              ],
            });
      
            const apiResult = await axios.get(
              `https://api.rawg.io/api/games?key=${API_KEY}`
            );
      
            const filteredApiResult = apiResult.data.results.map((element) => {
              const { name, background_image, genres, rating, id, ...rest } = element;
              return { name, background_image, genres, rating, id };
            });
      
            const response = dbResult.concat(filteredApiResult);
            return response;
          }
        
    } catch (err) {
        
    }
}

async function getDogInfo(dogID){
    try {
        
    } catch (err) {
        
    }
}

router.get("/dogs", async (req, res) => {
    try {
        
    //   if (req.query.name) {
    //     const dogName = req.query.name;
    //     const result = await getDogs(dogName);
    //     return res.json(result);
    //   } else {
    //     const result = await getDogs();
    //     return res.json(result);
    //   }
    } catch (err) {
      console.log(err)
    }
  });

  router.get("/dogs/:idDog", async (req, res) => {
    try {
        res.send("dogs id funcionando")
      
    } catch (err) {
      console.log(err)
    }
  });

  router.post("/dog", async (req, res) => {
    try {
      const dog = req.body;
      res.json(dog)
    } catch (err) {
      res.send(err);
    }
  
  });

  module.exports = router;