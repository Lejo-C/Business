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

export default function App() {
    const [page, setPage] = useState("Overview");
    const [modal, setModal] = useState(null);
    const pages = {
        Overview: <Overview setPage={setPage} />,
        Leads: <Leads />,
        Clients: <Clients />,
        Projects: <Projects />,
        Tasks: <Tasks />,
        Invoices: <Invoices />,
        Analytics: <Analytics />,
        Settings: <Settings />
    };
    return (
        <div className="min-h-screen bg-canvas">
            <Sidebar page={page} setPage={setPage} />
            <Topbar page={page} onSearch={() => setModal("search")} onAdd={() => setModal("new")} />
            <div className="px-4 py-7 sm:px-6 lg:ml-[238px] lg:px-8">
                <div className="mx-auto max-w-[1420px]">{pages[page] || <Overview setPage={setPage} />}</div>
            </div>
            {modal === "new" && <NewModal onClose={() => setModal(null)} />}
            {modal === "search" && <SearchModal onClose={() => setModal(null)} setPage={setPage} />}
        </div>
    )
}