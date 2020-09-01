import axios from 'axios'

const calendrierApi = axios.create({
  // baseURL: 'https://3001-a42396a5-2e76-4794-8d3b-a75427c0df67.ws-eu01.gitpod.io'
  baseURL: 'http://192.168.1.59:3001'
})

export default calendrierApi
