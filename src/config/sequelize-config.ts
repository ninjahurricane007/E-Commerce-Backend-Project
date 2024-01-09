import {Sequelize} from 'sequelize';

const sequelize=new Sequelize({ //instantiate, connect to db
    database:'e_commerce',
    username:'root',
    password:'Cherry@work',
    host:'127.0.0.1',
    dialect:'mysql'
})

export default sequelize