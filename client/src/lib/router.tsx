import { createBrowserRouter } from "react-router-dom";
import FrontPage from "../pages/FrontPage";
import { SignIn } from "../pages/SignIn";
// import Agents from "./Agents";
// import Agent from "./Agent";
// import Layout from "./Layout";
// import Chat from "./Chat";
// import Character from "./Character";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FrontPage />,
    },
    /*  {
         path: "agents/:agentId",
         element: <Agents />,
         children: [
             {
                 path: "", // This matches /:agentId exactly
                 element: <Agent />,
             },
             {
                 path: "chat", // This matches /:agentId/chat
                 element: <Chat />,
             },
             {
                 path: "character", // This matches /:agentId/chat
                 element: <Character />,
             },
         ],
     }, */
]);
