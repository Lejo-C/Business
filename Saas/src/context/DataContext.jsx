import { createContext, useState, useContext } from "react";
import {
  clients as mockClients,
  leads as mockLeads,
  projects as mockProjects,
} from "../data/mock";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [clients, setClients] = useState(mockClients);
  const [leads, setLeads] = useState(mockLeads);
  const [projects, setProjects] = useState(mockProjects);

  const addClient = (newClient) => {
    setClients((prev) => [...prev, newClient]);
  };

  const addLead = (newLead) => {
    setLeads((prev) => [...prev, newLead]);
  };

  const addProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <DataContext.Provider
      value={{
        clients,
        setClients,
        addClient,
        leads,
        setLeads,
        addLead,
        projects,
        setProjects,
        addProject,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
