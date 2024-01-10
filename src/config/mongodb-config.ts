import { Config } from "../../types/configTypes"

const config:Config={
    development:{
        mongoURI:'mongodb+srv://campus:ashiqmongodb@cluster0.zy39dpy.mongodb.net/?retryWrites=true&w=majority',
        port:3000,
        secretKey:'your-secret-key',
    },
    production:{
        mongoURI:'mongodb+srv://campus:ashiqmongodb@cluster0.zy39dpy.mongodb.net/?retryWrites=true&w=majority',
        port:8080,
        secretKey:'your_production_secret_key',
    },
}

export default config