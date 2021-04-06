import axios from "axios"


const api = {
    getClients: () => {
        return axios.get("http://localhost:3001/api/clients")
    },

    addClients: (clientData) => {
        return axios.post("/api/books", clientData)
    }
}
export default api