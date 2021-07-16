require("dotenv").config();
const axios = require("axios").default;
const { Router } = require("express");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const router = Router();


async function fillDB() {
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
        name: data[i].name,
        weight: data[i].weight.metric,
        height: data[i].height.metric,
        life_span: data[i].life_span,
        image: data[i].image.url,
        temperament: auxIDsArray
      })
    } else {
      dbClean.push({
        name: data[i].name,
        weight: data[i].weight.metric,
        height: data[i].height.metric,
        life_span: data[i].life_span,
        image: data[i].image.url,
        temperament: [120]
      })
    }

  }

  for (let a = 0; a < dbClean.length; a++) {
    const [auxDog, created] = await Dog.findOrCreate({
      where: {
        name: dbClean[a].name
      },
      defaults: {
        height: dbClean[a].height,
        weight: dbClean[a].weight,
        image: dbClean[a].image,
        life_span: dbClean[a].life_span
      }
    })
    if (created) {
      await auxDog.setTemperaments(dbClean[a].temperament)
    }
  }

  const result = await Dog.findAll({
    attributes: ["name", "image", "id", "weight", "created"],
    include: [{ model: Temperament }]
  })
  return result


}


async function getDogs(dogName) {
  try {
    if (dogName) {
      const dbResult = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${dogName}%`,
          },
        },
        attributes: ["name", "image", "id", "weight", "created"],
        include: [
          {
            model: Temperament,
          },
        ],
      });
      return dbResult;
    }


  } catch (err) {
    console.log(err)
  }
}

async function getDogInfo(dogID) {
  try {

    const id = Number.parseInt(dogID)
    if(id){
      const dog = await Dog.findByPk(id, {include: [{ model: Temperament }]});
      console.log(dog)
      if (dog) return dog;
      else return null
    }
    else return null

  } catch (err) {

  }
}

router.get("/dogs", async (req, res) => {
  try {
    let dogList = await Dog.findAll({
      attributes: ["name", "image", "id", "weight", "created"],
      include: [{ model: Temperament }]
    })

    if (dogList.length === 0) dogList = await fillDB()

    if (req.query.name) {
      const dogName = req.query.name
      const result = await getDogs(dogName)
      return res.json(result)
    }

    res.json(dogList)

  } catch (err) {
    console.log(err)
  }
});

router.get("/dogs/:idDog", async (req, res) => {
  try {
    const idDog = req.params.idDog
    const result = await getDogInfo(idDog);
    if(result) res.json(result)
    else res.send("el id indicado no existe o no es correcto")

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