import axios from "axios";
import { BACKEND_URL } from "../Constants";

export default axios.create({
    baseURL: BACKEND_URL,
});
