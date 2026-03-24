import { useState, useMemo } from "react";
import { Search, Download, Mail } from "lucide-react";

interface EmailContact {
  email: string;
  name: string;
  source: string;
}

// Seed contacts from Mailchimp CSV import
const csvContacts: EmailContact[] = [
  { email: "williamsra10@gmail.com", name: "Rasheem Williams", source: "import" },
  { email: "terellebony@gmail.com", name: "Terell Reed", source: "import" },
  { email: "audley.a.walters@gmail.com", name: "Audley A. Walters, Jr.", source: "import" },
  { email: "aina.isaiah@gmail.com", name: "Isaiah Aina", source: "import" },
  { email: "salfred796@aol.com", name: "Shaun Alfred", source: "import" },
  { email: "taliaferro_m@yahoo.com", name: "Mickael Taliaferro", source: "import" },
  { email: "zackbburke@gmail.com", name: "Zack B. Burke", source: "import" },
  { email: "abaker513@msn.com", name: "Alex Baker", source: "import" },
  { email: "cbirdsong3@gmail.com", name: "Charles Birdsong", source: "import" },
  { email: "taronbrown36@gmail.com", name: "Toryron Brown", source: "import" },
  { email: "elbrown592@gmail.com", name: "Eric Brown", source: "import" },
  { email: "tcp92689@gmail.com", name: "Timothy C. Pitts", source: "import" },
  { email: "rwebb59@yahoo.com", name: "Roscoe C. Webb 2nd", source: "import" },
  { email: "damonref@yahoo.com", name: "Damon Childs", source: "import" },
  { email: "mccanady1@gmail.com", name: "Michael Canady", source: "import" },
  { email: "drmarvincarr@gmail.com", name: "Marvin Carr", source: "import" },
  { email: "nupe3ai93@icloud.com", name: "Jame Chavis", source: "import" },
  { email: "clark12ai@gmail.com", name: "Anthony Clark", source: "import" },
  { email: "reggie.clemons2@gmail.com", name: "Reginald Clemons", source: "import" },
  { email: "jasonmclinkscale@gmail.com", name: "Jason Clinkscale", source: "import" },
  { email: "marcus.827@gmail.com", name: "Marcus Clinton", source: "import" },
  { email: "akc198@yahoo.com", name: "Ahmed Collins", source: "import" },
  { email: "kishorecomrie@gmail.com", name: "Kishore Comrie", source: "import" },
  { email: "kottrelldavis@outlook.com", name: "Kottrell Davis", source: "import" },
  { email: "donaldson.duane@gmail.com", name: "Duane Donaldson", source: "import" },
  { email: "kevinmdouglas219@gmail.com", name: "Kevin Douglas", source: "import" },
  { email: "anthony.dow95@gmail.com", name: "Anthony Dow", source: "import" },
  { email: "brotha.ironside@gmail.com", name: "Michael E. Henderson", source: "import" },
  { email: "secretsquirrel34@yahoo.com", name: "Lawrence E. Strange", source: "import" },
  { email: "jimmyjam5ai@yahoo.com", name: "James E. Johnson", source: "import" },
  { email: "noakeseanthony@gmail.com", name: "Anthony E. Noakes", source: "import" },
  { email: "natenupe@att.net", name: "Nathan Fletcher, DDS", source: "import" },
  { email: "dflwrs1@gmail.com", name: "Duane Flowers", source: "import" },
  { email: "l.frazier1@verizon.net", name: "Larry Frazier", source: "import" },
  { email: "saquon3frazier@gmail.com", name: "Saquon Frazier", source: "import" },
  { email: "fraziers333@gmail.com", name: "Saquon Frazier", source: "import" },
  { email: "tfuentes47@gmail.com", name: "Tyrel Fuentes", source: "import" },
  { email: "wilgiles@aol.com", name: "Wil Giles", source: "import" },
  { email: "antoineqglasgow@gmail.com", name: "Antoine Glasgow", source: "import" },
  { email: "rlgoodman7@gmail.com", name: "Ronald Goodman", source: "import" },
  { email: "coreygreenms2@gmail.com", name: "Corey Green", source: "import" },
  { email: "rgreen6875@gmail.com", name: "Rob Green", source: "import" },
  { email: "troyg911@gmail.com", name: "Troy Griffin Jr.", source: "import" },
  { email: "bigreefgq@gmail.com", name: "Cherif Haidara", source: "import" },
  { email: "cornelius.hairston@gmail.com", name: "Cornelius Hairston", source: "import" },
  { email: "kamron824@hotmail.com", name: "Kamron Hampton", source: "import" },
  { email: "hineschandler1@gmail.com", name: "Chandler Hines", source: "import" },
  { email: "bsitw.hines@gmail.com", name: "Chandler Hines", source: "import" },
  { email: "awiggins64@gmail.com", name: "Aaron J. Wiggins", source: "import" },
  { email: "xavierj23.xj@gmail.com", name: "Xavier Johnson", source: "import" },
  { email: "terjohnson3@gmail.com", name: "Terrell Johnson", source: "import" },
  { email: "kpj1911@gmail.com", name: "Kevin Johnson", source: "import" },
  { email: "harveyjulius12@gmail.com", name: "Harvey Julius", source: "import" },
  { email: "jadenkoranteng@gmail.com", name: "Jaden Kofi Koranteng", source: "import" },
  { email: "darren.clinkscale@atlanticare.org", name: "Darren L. Clinkscale", source: "import" },
  { email: "info@rlgoodman.com", name: "Ronald L. Goodman", source: "import" },
  { email: "seanosborne@verizon.net", name: "Sean L. Osborne, Sr.", source: "import" },
  { email: "leftwichtroy@gmail.com", name: "Troy Leftwich", source: "import" },
  { email: "1300scareytroy@gmail.com", name: "Troy Leftwich", source: "import" },
  { email: "martinmannings@aol.com", name: "Martin Mannings", source: "import" },
  { email: "kmcghaw@gmail.com", name: "Kevin McGhaw", source: "import" },
  { email: "marcus.c.mcclean@gmail.com", name: "Marcus Mcclean", source: "import" },
  { email: "mendoza6@gmail.com", name: "Shawn Mendoza", source: "import" },
  { email: "info@youngexekutive.com", name: "Carl Michel", source: "import" },
  { email: "israel.miller@gmail.com", name: "Israel Miller", source: "import" },
  { email: "shane790@aol.com", name: "Shane Mitchell", source: "import" },
  { email: "wmitchjr@gmail.com", name: "Wayne Mitchell Jr", source: "import" },
  { email: "ccmorganii@gmail.com", name: "Charlie Morgan, II", source: "import" },
  { email: "rmatt27157@aol.com", name: "Rodger Murphy Matthews", source: "import" },
  { email: "kaddeemmyrie@gmail.com", name: "Kaddeem Myrie", source: "import" },
  { email: "oneai67@yahoo.com", name: "Joseph N. Yearwood", source: "import" },
  { email: "henian.newsome@gmail.com", name: "Henian Newsome", source: "import" },
  { email: "okeanyi@gmail.com", name: "Ifeanyi Nwoko", source: "import" },
  { email: "lesleyofosu76@gmail.com", name: "Lesley Ofosu", source: "import" },
  { email: "leviticus2010@me.com", name: "Harold Ogunbo", source: "import" },
  { email: "slosborne1911@gmail.com", name: "Sean Osborne II", source: "import" },
  { email: "nupe76f@verizon.net", name: "Richard P. Giles", source: "import" },
  { email: "ajamuparry@gmail.com", name: "Ajamu Parry", source: "import" },
  { email: "kp@mpeckable.biz", name: "Kevin Peck", source: "import" },
  { email: "salisburyinvestments@gmail.com", name: "Donte Peters", source: "import" },
  { email: "godleyp1@gmail.com", name: "Godley Pierre", source: "import" },
  { email: "kappa3ai71@yahoo.com", name: "James Polk", source: "import" },
  { email: "naporter01@gmail.com", name: "Nicholas Porter", source: "import" },
  { email: "5ainupe@gmail.com", name: "Michael Pratt", source: "import" },
  { email: "anthony.prescott8@gmail.com", name: "Anthony Prescott", source: "import" },
  { email: "roland.r.selby@gmail.com", name: "Roland R. Selby Jr.", source: "import" },
  { email: "alvin.rudolph4@gmail.com", name: "Alvin Rudolph", source: "import" },
  { email: "mikejr.ragland@gmail.com", name: "Michael Ragland Jr.", source: "import" },
  { email: "wes.redfearn24@gmail.com", name: "Wes Redfearn Jr.", source: "import" },
  { email: "robertsjrc@gmail.com", name: "Cherrod Roberts Jr.", source: "import" },
  { email: "oriionsbelt@gmail.com", name: "Orion Robinson", source: "import" },
  { email: "crparran@comcast.net", name: "Claude Roscoe Parran", source: "import" },
  { email: "russellcu@aol.com", name: "Curtis Russell", source: "import" },
  { email: "ghsdunn@gmail.com", name: "Edward S. Dunn II", source: "import" },
  { email: "marsdencoates@gmail.com", name: "Marsden S. Coates", source: "import" },
  { email: "emmausferdinand@gmail.com", name: "Emmaus S. Ferdinand", source: "import" },
  { email: "mooseys724@gmail.com", name: "Seydina Salla", source: "import" },
  { email: "ahsswami@aol.com", name: "Arnold Sampson", source: "import" },
  { email: "anthony.showell@yahoo.com", name: "Anthony Showell", source: "import" },
  { email: "marquesjsmith@msn.com", name: "Marques Smith", source: "import" },
  { email: "blaircsmith@gmail.com", name: "Blair Smith", source: "import" },
  { email: "2ai99sp@gmail.com", name: "Ted Smith", source: "import" },
  { email: "fredstennis15@gmail.com", name: "Buford Stennis, III", source: "import" },
  { email: "javanstewart54@gmail.com", name: "Javan Stewart", source: "import" },
  { email: "jaste20@morgan.edu", name: "Javan Stewart", source: "import" },
  { email: "telltalley@gmail.com", name: "Craig Talley", source: "import" },
  { email: "dthomp7nupe@gmail.com", name: "David Thompson", source: "import" },
  { email: "vee@ravernon.com", name: "RA Vernon", source: "import" },
  { email: "jwheaton11@yahoo.com", name: "Jeffrey Wheaton", source: "import" },
  { email: "a.w82501@gmail.com", name: "Amir White", source: "import" },
  { email: "corymwhitman@gmail.com", name: "Cory Whitman", source: "import" },
  { email: "joshuawilks18@gmail.com", name: "Joshua Wilks", source: "import" },
  { email: "spoon0885@gmail.com", name: "Rodney Witherspoon", source: "import" },
  { email: "cwoody1019@gmail.com", name: "Calvin Woody", source: "import" },
  { email: "bobyoungai66@gmail.com", name: "Bob Young", source: "import" },
  { email: "james7232@gmail.com", name: "James M. Clark", source: "import" },
];

interface Subscriber {
  email: string;
  source?: string;
}

interface EmailListProps {
  subscribers: Subscriber[];
}

const EmailList = ({ subscribers }: EmailListProps) => {
  const [search, setSearch] = useState("");

  const merged = useMemo(() => {
    const map = new Map<string, EmailContact>();
    // Add CSV contacts first
    csvContacts.forEach((c) => map.set(c.email.toLowerCase(), c));
    // Merge subscribers — don't overwrite existing
    subscribers.forEach((s) => {
      const key = s.email.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { email: s.email, name: "", source: s.source || "subscriber" });
      }
    });
    return Array.from(map.values()).sort((a, b) =>
      (a.name || a.email).localeCompare(b.name || b.email)
    );
  }, [subscribers]);

  const filtered = merged.filter(
    (c) =>
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const csv = ["Email,Name,Source"]
      .concat(merged.map((c) => `"${c.email}","${c.name}","${c.source}"`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `email-list-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
          Email List ({filtered.length} of {merged.length})
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
            onClick={exportCSV}
            className="flex items-center gap-1.5 bg-foreground text-background px-3 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors flex-shrink-0"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">CSV</span>
          </button>
        </div>
      </div>

      {/* Desktop table */}
      <div className="border border-border overflow-hidden hidden sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Source</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.email} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium">{c.name || "—"}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${c.email}`} className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                    <Mail size={12} />
                    {c.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground capitalize text-xs">{c.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2">
        {filtered.map((c) => (
          <div key={c.email} className="border border-border p-3 space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium truncate">{c.name || "—"}</p>
              <span className="text-[10px] text-muted-foreground capitalize flex-shrink-0">{c.source}</span>
            </div>
            <a href={`mailto:${c.email}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Mail size={11} />
              {c.email}
            </a>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">No emails found.</p>
      )}
    </div>
  );
};

export default EmailList;
