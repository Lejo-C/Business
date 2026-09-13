// Clients page with add functionality
import { useState } from "react";
import { useData } from "../context/DataContext";
import Table from "./Table";
import NewModal from "./NewModal";

export default function Clients() {
  const { clients, addClient } = useData();
  const [showModal, setShowModal] = useState(false);

  const handleAddClient = (newClient) => {
    addClient(newClient);
  };

  return (
    <main className="animate-enter space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Relationships</p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-.04em]">Clients</h2>
          <p className="mt-2 text-sm text-muted">
            A clear view of your active accounts.
          </p>
        </div>
        <button className="btn-accent" onClick={() => setShowModal(true)}>
          + Add client
        </button>
      </div>
      <Table
        columns={["Client", "Contact", "Projects", "Revenue", "Status"]}
        rows={clients}
        renderRow={(c) => (
          <tr key={c.name} className="transition hover:bg-[#fafaf7]">
            <td className="px-5 py-4 font-semibold">{c.name}</td>
            <td className="px-5 py-4 text-muted">{c.contact}</td>
            <td className="px-5 py-4">{c.projects}</td>
            <td className="px-5 py-4 font-semibold">{c.revenue}</td>
            <td className="px-5 py-4">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${c.status === "Active" ? "bg-moss text-olive" : "bg-[#f0f1ea] text-muted"}`}
              >
                {c.status}
              </span>
            </td>
          </tr>
        )}
      />
      {showModal && (
        <NewModal onClose={() => setShowModal(false)} onCreate={handleAddClient} />
      )}
    </main>
  );
}