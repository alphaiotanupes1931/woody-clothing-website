import { useState } from "react";
import logo from "@/assets/logo.png";
const AdminLogin = ({ onAuth }: { onAuth: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      sessionStorage.setItem("admin-auth", "true");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 border border-border flex items-center justify-center mx-auto">
            <Lock size={20} className="text-muted-foreground" />
          </div>
          <h1 className="text-lg font-semibold tracking-[0.15em] uppercase">Admin Panel</h1>
          <p className="text-xs text-muted-foreground tracking-wider uppercase">
            Managed by Reed Digital Group
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border border-border bg-background px-4 py-3 text-sm tracking-wider focus:outline-none focus:border-foreground transition-colors"
            autoFocus
          />
          {error && (
            <p className="text-xs text-destructive">Incorrect password</p>
          )}
          <button
            type="submit"
            className="w-full bg-foreground text-background py-3 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
