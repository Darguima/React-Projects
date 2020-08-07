import axios from "axios"

const calendrierApi = axios.create({baseURL: "https://3001-fa2a6196-ab62-4f81-881c-deec5e1119ad.ws-eu01.gitpod.io/api"})
// RP_server: http://192.168.1.60/api
// mg_server: http://10.42.0.152/api
// External acess: http://dsgdevbraga.ddns.net/api
// Gitpod: https://3001-fa2a6196-ab62-4f81-881c-deec5e1119ad.ws-eu01.gitpod.io/api

export default calendrierApi
