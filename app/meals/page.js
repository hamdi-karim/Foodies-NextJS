import Link from "next/link";

export default function MealsPage() {
  return (
    <main>
      <h2>Welcome to Meals Page</h2>
      <Link href="/meals/share">Share</Link>
    </main>
  );
}
