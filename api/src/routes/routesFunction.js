const {Country, TouristActivity} = require("../db.js")
const axios = require("axios")
const { Op } = require('sequelize')

const countryByName= async function(name){
    if(name){      
        const response = await Country.findAll({ // Traigo los paises de mi DB
            where: {
                name: {[Op.iLike]: `%${name}%`}  // en donde el name contenga el substring del name pasado por query
            },
            include: {model: TouristActivity}    // incluyendo el modelo de las actividades
        })
        response.sort(function(a, b){
            if(a.name > b.name){
                return 1
            }
            if(b.name > a.name){
                return -1
            }
        })
        //console.log(response)
        return response
    }    
}


module.exports = {

    postActivity: async function (req, res, next){
        try{
            const {name, dificulty, duration, season, countries} = req.body

            const newActivity = await TouristActivity.create({
                name,
                dificulty,
                duration,
                season
            })
            countries?.forEach(async (country) => {
                const countryDB = await Country.findAll({
                    where:{
                        name: country
                    }
                })
                await newActivity.addCountry(countryDB) 
            })
            return res.send("Activity created!")

        }catch(err){
            next(err)
        }
    },


    getCountries: async function (req, res, next) {
        try{
            const {name} = req.query
            if(name){                                           //Si me pasan un name por query 
                const countryName = await countryByName(name)   //uso la funcion que hice de countryByName
                return res.json(countryName)
            }else{                                              //Si no me pasan un name

                const dbCountries = await Country.findAll({
                    include: {model: TouristActivity}
                })         //Primero compruebo si los paises ya estan en mi DB, si no estan hago todo lo de abajo 
                if(dbCountries.length > 0){                     //haciendo el pedido a la API y llenando mi DB
                    dbCountries.sort(function(a, b){
                        if(a.name > b.name){
                            return 1
                        }
                        if(b.name > a.name){
                            return -1
                        }
                    })                  
                    return res.json(dbCountries)
               
                }else{
                    const countries = await axios(`https://restcountries.com/v3/all`)
                    const countriesData = countries.data
                    const countryInfo = countriesData.map(country => { 
                        return{
                            id: country.cca3? country.cca3 : "",
                            name: country.name.official,
                            flag: country.flags[0],
                            continents: country.continents? country.continents[0] : "",          //Uso ternarios porque hay props que estan vacias.
                            capital: country.capital? country.capital[0] : "",
                            sub_region: country.subregion? country.subregion : "",
                            area: country.area,
                            population: country.population
                        }
                    })

                    countryInfo.forEach(async (country) => {
                        await Country.findOrCreate({
                            where:{
                                id: country.id,
                                name: country.name,
                                flag: country.flag,
                                continents: country.continents,
                                capital: country.capital,
                                sub_region: country.sub_region,
                                area: country.area,
                                population: country.population
                            }
                        })
                    })
                    const allCountries = await Country.findAll({
                        include: {model: TouristActivity}
                    })
                    allCountries.sort(function(a, b){ 
                        if(a.name > b.name){
                            return 1
                        }
                        if(b.name > a.name){
                            return -1
                        }
                    })
                    return res.json(allCountries)
                }
            }
        }catch(err){
            next(err)
        }
    },

    detailedCountry: async function(req, res, next){
        const {countryId} = req.params
        try{
            const results = await axios(`https://restcountries.com/v3/alpha/${countryId}`)
            //console.log(results)
            //if(results.data.status === 400) return res.send("Whoops! Seems like that country doesnt exist in this planet!")
            results.data.map(result => {
                return{
                    flag: result.flags[1],
                    name: result.name.official,
                    id: result.cca3? result.cca3 : "",
                    capital: result.capital? result.capital[0] : "",
                    sub_region: result.subregion? result.subregion : "",
                    area: result.area,
                    population: result.population
                }
            })
            const response = await Country.findByPk(countryId.toUpperCase(), {
                include: TouristActivity,
              });
            return res.json(response)
        }catch(err){
            next(err)
        }
    },

    getActivities: async function (req, res, next){
        try{
            const activities = await TouristActivity.findAll()
            return res.json(activities)
        }catch(err){
            next(err)
        }
    }

}