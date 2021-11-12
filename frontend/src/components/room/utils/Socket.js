import io from "socket.io-client";
const ENDPOINT = "";
export default io(ENDPOINT, { path: '/signaling/socket.io'});