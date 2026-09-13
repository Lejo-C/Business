// NewModal component for creating Leads, Clients, or Projects
import { useState } from "react";
import Modal from "./Modal";

export default function NewModal({ onClose, onCreate, defaultType }) {
  const [type, setType] = useState(defaultType || "Lead");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreate = () => {
    if (onCreate) {
      let newItem;
      if (type === "Lead") {
        newItem = {
          company: name || "Unnamed",
          contact: email || "",
          value: "₹0",
          stage: "Qualified",
          age: "0d",
          initials: (name?.slice(0, 2) || "NA").toUpperCase(),
        };
      } else if (type === "Client") {
        newItem = {
          name: name || "Unnamed",
          contact: email || "",
          projects: 0,
          revenue: "₹0",
          status: "Active",
        };
      } else if (type === "Project") {
        newItem = {
          name: name || "Unnamed",
          client: "",
          progress: 0,
          due: "TBD",
          status: "Planning",
        };
      }
      onCreate(newItem, type);
    }
    onClose();
  };

  return (
    <Modal title={`Create ${type.toLowerCase()}`} onClose={onClose}>
      <div className="mb-5 flex gap-2">
        {["Lead", "Client", "Project"].map((x) => (
          <button
            key={x}
            onClick={() => setType(x)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold ${type === x ? "bg-ink text-white" : "bg-[#f0f1ea] text-muted"}`}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold">{type === "Project" ? "Project name" : "Company name"}</label>
          <input className="input" placeholder={type === "Project" ? "Project name" : "Company name"} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold">Contact email</label>
          <input className="input" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {type === "Project" && (
          <div>
            <label className="mb-1.5 block text-xs font-semibold">Due date</label>
            <input type="date" className="input" />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onClose} className="btn-ghost">Cancel</button>
        <button onClick={handleCreate} className="btn-accent">Create {type}</button>
      </div>
    </Modal>
  );
}