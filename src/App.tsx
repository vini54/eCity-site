import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { ContextProvider } from "./config/Context";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={Router} />
    </ContextProvider>
  );
}

export default App;
