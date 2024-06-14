import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import AuthProvider from "./authProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <DndProvider backend={HTML5Backend}>
            <RouterProvider router={router} />
          </DndProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
