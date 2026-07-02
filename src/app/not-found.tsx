import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ letterSpacing: "0.2em", fontSize: "0.75rem", opacity: 0.6 }}>
          404
        </p>
        <h1 style={{ marginTop: "1rem", fontSize: "2rem" }}>Page not found</h1>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            opacity: 0.8,
          }}
        >
          Return to home
        </Link>
      </div>
    </main>
  );
}
