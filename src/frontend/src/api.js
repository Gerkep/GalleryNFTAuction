import axios from "axios";

export default axios.create({
    baseURL: "https://victorgallery.herokuapp.com/api"
});