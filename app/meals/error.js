"use client";

export default function ErrorPage({ error }) {
  return (
    <div className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meals data! Please try again.</p>
    </div>
  );
}
