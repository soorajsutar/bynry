import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Admin from "./components/Admin";
import Main from "./components/Main";
import PersonSummery from "./components/PersonSummery";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
   const router = createBrowserRouter([
    {
      path:"/",
      element: <Main/>,
    },
    {
      path: "/PersonSummery/:id",
      element: <PersonSummery/>,
    },
    {
      path: "/Admin",
      element:<Admin/>,
    },
  
  ]);
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  );
}

export default App;
