import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Overview from "./components/Overview";
import Leads from "./components/Leads";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import Tasks from "./components/Tasks";
import Invoices from "./components/Invoices";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import NewModal from "./components/NewModal";
import SearchModal from "./components/SearchModal";
import { DataProvider, useData } from "./context/DataContext";

function AppContent() {
  const [page, setPage] = useState("Overview");
  const [modal, setModal] = useState(null); // can be "search", or { type: "new", defaultTab: "Lead" }
  
  const { addClient, addLead, addProject } = useData();

  const pages = {
    Overview: <Overview setPage={setPage} />,
    Leads: <Leads />,
    Clients: <Clients />,
    Projects: <Projects />,
    Tasks: <Tasks />,
    Invoices: <Invoices />,
    Analytics: <Analytics />,
    Settings: <Settings />,
  };

  const handleGlobalCreate = (newItem, type) => {
    if (type === "Lead") addLead(newItem);
    if (type === "Client") addClient(newItem);
    if (type === "Project") addProject(newItem);
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar page={page} setPage={setPage} />
      <Topbar
        page={page}
        onSearch={() => setModal("search")}
        onAdd={() => {
          // If on Clients, default to Client; if on Projects, Project; else Lead
          let defaultTab = "Lead";
          if (page === "Clients") defaultTab = "Client";
          if (page === "Projects") defaultTab = "Project";
          setModal({ type: "new", defaultTab });
        }}
      />
      <div className="px-4 py-7 sm:px-6 lg:ml-[238px] lg:px-8">
        <div className="mx-auto max-w-[1420px]">{pages[page] || <Overview setPage={setPage} />}</div>
      </div>
      {modal?.type === "new" && (
        <NewModal
          defaultType={modal.defaultTab}
          onClose={() => setModal(null)}
          onCreate={handleGlobalCreate}
        />
      )}
      {modal === "search" && <SearchModal onClose={() => setModal(null)} setPage={setPage} />}
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}