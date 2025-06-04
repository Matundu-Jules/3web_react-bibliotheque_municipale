import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentChanges } from '../api/openLibrary';

interface ChangeItem {
  data?: { key?: string; title?: string };
}

function HomePage() {
  const [changes, setChanges] = useState<ChangeItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecentChanges(10)
      .then(setChanges)
      .catch(() => setError('Failed to load recent changes'));
  }, []);

  return (
    <div>
      <h2>Recent Changes</h2>
      {error && <p>{error}</p>}
      <ul>
        {changes.map((c, i) => {
          const workId = c.data?.key?.replace('/works/', '');
          if (!workId || !c.data?.title) return null;
          return (
            <li key={i}>
              <Link to={`/book/${workId}`}>{c.data.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
