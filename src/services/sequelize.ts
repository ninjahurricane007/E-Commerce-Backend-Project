import sequelize from "../config/sequelize-config"

const sequelizeSync=async():Promise<void>=>{
    await sequelize.authenticate()
    .then(()=>{
        console.log('Connected to database')
    })
    .catch((err:Error)=>{
        console.error('Unable to connect to database:',err)
    })

    sequelize.sync({force:false}) //drop table if force is true
    .then(()=>{
        console.log('Database synced')
    })
    .catch((error)=>{
        console.error("Error syncing database:",error)
    })
}

export default sequelizeSync