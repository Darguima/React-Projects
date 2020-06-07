import {Request, Response} from "express"
import knex from "../database/connection"

class ItemsController{
    async index(request: Request, response: Response){
        const items = await knex("items").select("*")
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                name: item.title,
                //image_url: `http://localhost:3001/uploads/${item.image}`
                //image_url: `http://192.168.1.60:3001/uploads/${item.image}`
                image_url: `http://dsgdevbraga.ddns.net:3001/uploads/${item.image}`
            }
        })
    
        return response.json(serializedItems)
    
    }
}

export default ItemsController
