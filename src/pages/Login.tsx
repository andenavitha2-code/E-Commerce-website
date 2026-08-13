import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch {
      setError("Login failed. Check your username and password and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink">Log in</h1>
        <p className="text-sm text-inkmute mt-2">
          This demo authenticates against the Fake Store API's mock login endpoint —
          it's a UI flow only, no real accounts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="border border-line rounded-sm p-6 bg-white space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wide text-inkmute mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border border-line rounded-sm py-2.5 px-3 text-sm focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wide text-inkmute mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-line rounded-sm py-2.5 px-3 text-sm focus:border-accent transition-colors"
          />
        </div>

        {error && <p className="text-xs text-accent font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-teal text-paper text-sm font-medium uppercase tracking-wide rounded-sm hover:bg-accent transition-colors disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>

        <p className="text-[11px] text-inkmute font-mono text-center pt-1">
          Prefilled with a valid demo account from the Fake Store API.
        </p>
      </form>
    </div>
  );
}
