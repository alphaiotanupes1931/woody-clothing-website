import { useState } from "react";
import { Search, Phone, Download, Plus, X } from "lucide-react";

interface Contact {
  name: string;
  phone: string;
}

const initialContacts: Contact[] = [
  { name: "Roscoe C. Webb 2nd", phone: "(301) 807-5594" },
  { name: "Isaiah Aina", phone: "(443) 322-4313" },
  { name: "Shaun Alfred", phone: "(240) 676-1135" },
  { name: "Alex Baker", phone: "(301) 742-2852" },
  { name: "Toryron Brown", phone: "(302) 757-0659" },
  { name: "Eric Brown", phone: "(845) 551-9275" },
  { name: "Zack B. Burke", phone: "(443) 769-3921" },
  { name: "Marvin Carr", phone: "(678) 602-0547" },
  { name: "Damon Childs", phone: "(240) 350-1778" },
  { name: "Anthony Clark", phone: "(410) 207-1767" },
  { name: "James M. Clark", phone: "(410) 340-0421" },
  { name: "Jason Clinkscale", phone: "(248) 867-0143" },
  { name: "Darren L. Clinkscale", phone: "(609) 204-5608" },
  { name: "Marsden S. Coates", phone: "(443) 797-3850" },
  { name: "Ahmed Collins", phone: "(973) 698-4234" },
  { name: "Kishore Comrie", phone: "(347) 608-8424" },
  { name: "Kottrell Davis", phone: "(443) 261-7421" },
  { name: "Nathan Fletcher, DDS", phone: "(410) 365-4265" },
  { name: "Emmaus S. Ferdinand", phone: "(347) 866-5069" },
  { name: "Duane Flowers", phone: "(917) 574-7737" },
  { name: "Larry Frazier", phone: "(443) 987-4084" },
  { name: "Saquon Frazier", phone: "(347) 866-9405" },
  { name: "Tyrel Fuentes", phone: "(347) 589-2095" },
  { name: "Wil Giles", phone: "(301) 717-3172" },
  { name: "Richard P. Giles", phone: "(757) 715-8810" },
  { name: "Ronald L. Goodman", phone: "(410) 779-8531" },
  { name: "Corey Green", phone: "(202) 860-8677" },
  { name: "Cornelius Hairston", phone: "(443) 829-1653" },
  { name: "Kamron Hampton", phone: "(443) 418-1363" },
  { name: "Michael E. Henderson", phone: "(609) 874-5676" },
  { name: "Chandler Hines", phone: "(410) 340-5234" },
  { name: "Sean Osborne II", phone: "(301) 502-0848" },
  { name: "Edward S. Dunn II", phone: "(215) 767-9321" },
  { name: "Xavier Johnson", phone: "(443) 599-2715" },
  { name: "James E. Johnson", phone: "(443) 240-7050" },
  { name: "Terrell Johnson", phone: "(917) 676-2443" },
  { name: "Audley A. Walters, Jr.", phone: "(804) 366-0637" },
  { name: "Cherrod Roberts Jr.", phone: "(862) 220-9713" },
  { name: "Troy Griffin Jr.", phone: "(443) 414-6785" },
  { name: "Wes Redfearn Jr.", phone: "(443) 621-1101" },
  { name: "Roland R. Selby Jr.", phone: "(443) 547-0722" },
  { name: "Michael Ragland Jr.", phone: "(240) 603-3061" },
  { name: "Jaden Kofi Koranteng", phone: "(240) 470-9006" },
  { name: "Troy Leftwich", phone: "(804) 519-3109" },
  { name: "Martin Mannings", phone: "(310) 487-7285" },
  { name: "Rodger Murphy Matthews", phone: "(913) 200-8886" },
  { name: "Marcus Mcclean", phone: "(410) 274-9268" },
  { name: "Kevin McGhaw", phone: "(202) 607-8520" },
  { name: "Israel Miller", phone: "(443) 570-1978" },
  { name: "Henian Newsome", phone: "(240) 204-1952" },
  { name: "Anthony E. Noakes", phone: "(267) 285-3577" },
  { name: "Ifeanyi Nwoko", phone: "(443) 418-3112" },
  { name: "Lesley Ofosu", phone: "(443) 929-4499" },
  { name: "Claude Roscoe Parran", phone: "(301) 574-1507" },
  { name: "Godley Pierre", phone: "(908) 341-2681" },
  { name: "Timothy C. Pitts", phone: "(718) 509-5245" },
  { name: "James Polk", phone: "(404) 769-2791" },
  { name: "Nicholas Porter", phone: "(209) 747-0479" },
  { name: "Michael Pratt", phone: "(240) 640-2979" },
  { name: "Anthony Prescott", phone: "(917) 741-3534" },
  { name: "Terell Reed", phone: "(301) 332-4084" },
  { name: "Alvin Rudolph", phone: "(443) 462-2157" },
  { name: "Seydina Salla", phone: "(281) 624-7980" },
  { name: "Arnold Sampson", phone: "(410) 736-1700" },
  { name: "Anthony Showell", phone: "(443) 642-1096" },
  { name: "Blair Smith", phone: "(917) 608-3994" },
  { name: "Ted Smith", phone: "(215) 327-2322" },
  { name: "Sean L. Osborne, Sr.", phone: "(301) 502-7364" },
  { name: "Javan Stewart", phone: "(347) 750-9385" },
  { name: "Lawrence E. Strange", phone: "(202) 492-1156" },
  { name: "Mickael Taliaferro", phone: "(410) 739-6064" },
  { name: "Craig Talley", phone: "(410) 608-9971" },
  { name: "David Thompson", phone: "(410) 627-7381" },
  { name: "RA Vernon", phone: "(914) 202-2030" },
  { name: "Jeffrey Wheaton", phone: "(443) 546-7035" },
  { name: "Amir White", phone: "(347) 228-8537" },
  { name: "Cory Whitman", phone: "(240) 832-8839" },
  { name: "Aaron J. Wiggins", phone: "(410) 499-8494" },
  { name: "Joshua Wilks", phone: "(443) 478-0451" },
  { name: "Rasheem Williams", phone: "(347) 313-3827" },
  { name: "Calvin Woody", phone: "(443) 416-7186" },
  { name: "Joseph N. Yearwood", phone: "(202) 558-8514" },
  { name: "Bob Young", phone: "(302) 383-7580" },
];

const PhoneDirectory = () => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const addContact = () => {
    const name = newName.trim();
    const phone = newPhone.trim();
    if (!name || !phone) return;
    const updated = [...contacts, { name, phone }].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(updated);
    setNewName("");
    setNewPhone("");
    setShowAdd(false);
  };

  const exportCSV = () => {
    const csv = ["Name,Phone"]
      .concat(contacts.map((c) => `"${c.name}","${c.phone}"`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brothers-directory-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
          Brothers Directory ({filtered.length})
        </h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56 sm:flex-none">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-border bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 bg-foreground text-background px-3 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors flex-shrink-0"
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Add</span>
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 bg-foreground text-background px-3 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors flex-shrink-0"
          >
            <Download size={13} />
            <span className="hidden sm:inline">CSV</span>
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="border border-border p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:items-end">
          <div className="flex-1 space-y-1">
            <label className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Full name"
              className="w-full px-3 py-2 text-sm border border-border bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">Phone</label>
            <input
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="(xxx) xxx-xxxx"
              className="w-full px-3 py-2 text-sm border border-border bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
          </div>
          <div className="flex gap-2 sm:flex-shrink-0">
            <button
              onClick={addContact}
              disabled={!newName.trim() || !newPhone.trim()}
              className="flex-1 sm:flex-none bg-foreground text-background px-4 py-2 text-xs font-semibold tracking-wider uppercase hover:bg-foreground/90 transition-colors disabled:opacity-40"
            >
              Save
            </button>
            <button
              onClick={() => { setShowAdd(false); setNewName(""); setNewPhone(""); }}
              className="flex-1 sm:flex-none border border-border px-4 py-2 text-xs font-semibold tracking-wider uppercase hover:bg-muted/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Desktop table */}
      <div className="border border-border overflow-hidden hidden sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.name + c.phone} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <a href={`tel:${c.phone}`} className="hover:text-foreground transition-colors flex items-center gap-1.5">
                    <Phone size={12} />
                    {c.phone}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2">
        {filtered.map((c) => (
          <div key={c.name + c.phone} className="border border-border p-3 flex items-center justify-between gap-2">
            <p className="text-sm font-medium truncate">{c.name}</p>
            <a
              href={`tel:${c.phone}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 flex-shrink-0"
            >
              <Phone size={12} />
              {c.phone}
            </a>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">No contacts found.</p>
      )}
    </div>
  );
};

export default PhoneDirectory;
