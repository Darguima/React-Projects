import React, { useEffect, useState, ChangeEvent, FormEvent} from "react"
import {FiArrowLeft} from "react-icons/fi"
import { Link, useHistory } from "react-router-dom"
import {Map, TileLayer, Marker } from "react-leaflet"
import { LeafletMouseEvent } from "leaflet"
import api from "../../services/api"
import axios from "axios"

import "./styles.css"

import logo from "../../assets/logo.svg"

interface Item{
    id: number,
    name: string,
    image_url: string
}

interface UfsResponse{
    geonameId: number,
    name: string
}

interface CitiesResponse{
    geonameId: number,
    toponymName: string
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: ""
    })

    const [selectedItems, setSelectedItems] = useState<number []>([])

    const [ufs, setUfs] = useState<UfsResponse[]>([])
    const [selectedUf, setSelectedUf] = useState<string>()

    const [cities, setCities] = useState<CitiesResponse[]>([])
    const [selectedCity, setSelectedCity] = useState<string>()

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])


    const history = useHistory()


    useEffect(() => {
        api.get("items")
            .then(response => {
                setItems(response.data)
        })
    }, [])

    //http://www.geonames.org/childrenJSON?geonameId=2264397

    useEffect(() => {
        axios.get("http://www.geonames.org/childrenJSON?geonameId=2264397")
            .then(response => {
                const responseFiltered = response.data.geonames.map((uf: UfsResponse) => ({
                    name: uf.name,
                    geonameId: uf.geonameId
                }))

                setUfs(responseFiltered)
            })
    }, [])

    const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
        const ufSelected = ufs.find(item => {
            return item.name === event.target.value
        })

        if (ufSelected){
            axios.get(`http://www.geonames.org/childrenJSON?geonameId=${ufSelected.geonameId}`)
                .then(response => {
                    const responseFiltered = response.data.geonames.map((city: CitiesResponse) => ({
                        toponymName: city.toponymName,
                        geonameId: city.geonameId
                    }))

                    setCities(responseFiltered)
                    setSelectedCity("")
                    setSelectedUf(ufSelected.name)
                }
            )
        }

        else {
            setCities([])
            setSelectedCity("")
            setSelectedUf("")
        }
    }

    const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
        const citySelected = cities.find(item => {
            return item.toponymName === event.target.value
        })

        if (citySelected){
            setSelectedCity(citySelected.toponymName)
        }

        else {
            setSelectedCity("")
        }
    }


    const handleMapClick = (event: LeafletMouseEvent) => {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }


    const  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({...formData, [name]: value})
    }

    const handleSelectItem = (id: number) => {
        const alreadySelected = selectedItems.findIndex(item => item === id)

        if (alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item => item !== id)

            setSelectedItems(filteredItems)
        }

        else{
            setSelectedItems([...selectedItems, id])
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const {name, email, whatsapp} = formData
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

        await api.post("points", data)
            .then(() => alert("Ponto de coleta criado"))
            .catch(error => alert(error))

        history.push("/")
    }


    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do<br/>ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">

                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>

                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereços</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[41.5472536, -8.4014611]} zoom={15} onclick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition}/>
                    </Map>
                    
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select 
                                name="uf" 
                                id="uf"
                                onChange={handleSelectUf}
                            >

                                <option value="0">Selecione um UF</option>

                                {ufs.map((ufName, index) => (
                                    <option 
                                        value={ufName.name}
                                        key={index}
                                    >
                                        {ufName.name}
                                    </option>
                                ))}
                                
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city"
                                id="city"
                                onChange={handleSelectCity}
                            >

                                <option value="0">Selecione uma ciade</option>

                                {cities.map((cityName, index) => (
                                    <option 
                                        value={cityName.toponymName}
                                        key={index}
                                    >
                                        {cityName.toponymName}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>
                    

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Items de Coleta</h2>
                        <span>Selecione um ou mais items abaixo</span>
                    </legend>

                    <ul className="items-grid">

                        {items.map((item) => (
                            <li 
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? "selected" : ""}
                            >
                                <img src={item.image_url} alt="teste"/>
                                <span>{item.name}</span>
                            </li>
                        ))}

                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar Ponto de Coleta
                </button>

            </form>
        </div>
    )
}

export default CreatePoint
