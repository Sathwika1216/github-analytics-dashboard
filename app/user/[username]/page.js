import styles from "./profile.module.css";
import Link from "next/link";

async function getGitHubData(username) {
  const userRes = await fetch(`https://api.github.com/users/${username}`);
  const repoRes = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
  );

  if (!userRes.ok) return { error: true };

  const profile = await userRes.json();
  const repos = await repoRes.json();

  return { profile, repos };
}

export default async function UserProfile({ params }) {
  const { username } = await params;
  const { profile, repos, error } = await getGitHubData(username);

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        User not found! <Link href="/">Go back</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">← Back to Search</Link>
      </header>

      <div className={styles.layout}>
        {/* Sidebar: Profile Info */}
        <aside className={styles.sidebar}>
          <img
            src={profile.avatar_url}
            alt={profile.name}
            className={styles.avatar}
          />
          <h2>{profile.name}</h2>
          <p className={styles.username}>@{profile.login}</p>
          <p>{profile.bio}</p>
          <div className={styles.stats}>
            <span>
              <strong>{profile.followers}</strong> followers
            </span>
            <span>
              <strong>{profile.following}</strong> following
            </span>
          </div>
        </aside>

        {/* Main Content: Repositories */}
        <main className={styles.main}>
          <h3>Latest Repositories</h3>
          <div className={styles.repoGrid}>
            {repos.map((repo) => (
              <div key={repo.id} className={styles.repoCard}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  <h4>{repo.name}</h4>
                </a>
                <p>{repo.description || "No description provided."}</p>
                <div className={styles.repoMeta}>
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  {repo.language && <span>● {repo.language}</span>}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
