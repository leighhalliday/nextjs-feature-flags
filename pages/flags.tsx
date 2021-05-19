// ✅ ☑️ ❌
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function Flags() {
  const [newFlag, setNewFlag] = useState("");
  const { data: flags, error, mutate: reload } = useSWR("/api/flags", fetcher);

  if (error) return <p>Sorry.</p>;
  if (!flags) return <p>Loading.</p>;

  return (
    <div className="flags">
      <h1>Flags</h1>

      <ul>
        {Object.entries(flags).map(([key, value]) => (
          <li key={key}>
            {value ? (
              <button
                onClick={async () => {
                  await fetch(`/api/flags/${key}/disable`);
                  reload();
                }}
              >
                ✅
              </button>
            ) : (
              <button
                onClick={async () => {
                  await fetch(`/api/flags/${key}/enable`);
                  reload();
                }}
              >
                ☑️
              </button>
            )}

            <span>{key}</span>

            <button
              onClick={async () => {
                await fetch(`/api/flags/${key}/remove`);
                reload();
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch(`/api/flags/${newFlag}/enable`);
          reload();
          setNewFlag("");
        }}
      >
        <input
          type="text"
          required
          value={newFlag}
          onChange={(e) => setNewFlag(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
