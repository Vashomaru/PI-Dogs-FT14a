require("dotenv").config();
const axios = require("axios").default;
const { Router } = require("express");
const { API_KEY } = process.env;
//const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const router = Router();


async function fillDB(){
  const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  const tempIDs = await Temperament.findAll()
  const dbClean = []
  
  for (let i = 0; i < data.length; i++) {
    if (data[i].temperament) {
      let aux = data[i].temperament.split(",")
      
      let auxIDsArray = aux.map(item => {
        let trimmed = item.trim()
        let index = tempIDs.findIndex(temp => temp.name === trimmed)
        return tempIDs[index].id
      })
      
      dbClean.push({
        name : data[i].name ,
        weight : data[i].weight.metric ,
        height : data[i].height.metric ,
        life_span : data[i].life_span ,
        image : data[i].image.url ,
        temperament : auxIDsArray
      })
    }else{
      dbClean.push({
        name : data[i].name ,
        weight : data[i].weight.metric ,
        height : data[i].height.metric ,
        life_span : data[i].life_span ,
        image : data[i].image.url ,
        temperament : [120]
      })
    }

  }
        
  for (let a = 0; a < dbClean.length; a++) {
    const [auxDog , created] = await Dog.findOrCreate({
      where :{
        name : dbClean[a].name
      } ,
      defaults : {
        height: dbClean[a].height ,
        weight : dbClean[a].weight ,
        image : dbClean[a].image ,
        life_span : dbClean[a].life_span
      }
    })
    if(created) {
      await auxDog.setTemperaments(dbClean[a].temperament)
    }
  }

  const result = await Dog.findAll({include : [{model: Temperament}]})
  return result 
  

}


async function getDogs(dogName) {
  try {
    if (dogName) {
      const dbResult = await Dog.findAll({
        where: {
          name: {
            [Op.like]: `%${dogName}%`,
          },
        },
        attributes: ["name", "image", "id", "weight"],
        include: [
          {
            model: Temperament,
          },
        ],
      });

      const response = dbResult.concat(filteredApiResult);
      return response;
    }


  } catch (err) {
    console.log(err)
  }
}

async function getDogInfo(dogID) {
  try {

  } catch (err) {

  }
}

router.get("/dogs", async (req, res) => {
  try {
    let dogList = await Dog.findAll({include : [{model: Temperament}]})

    if (dogList.length === 0) dogList = await fillDB()

    
    if (req.query.name) {
      const dogName = req.query.name
      const result = await getDogs(dogName)
      return res.json(result)
    }

    res.json(dogList)

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