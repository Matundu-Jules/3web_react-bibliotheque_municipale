import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWork } from '../api/openLibrary';
import { getWikipediaSummary, WikiSummary } from '../api/wikipedia';
import { WorkDetail } from '../types/OpenLibrary';

function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [work, setWork] = useState<WorkDetail | null>(null);
  const [wiki, setWiki] = useState<WikiSummary | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getWork(id)
      .then((data) => {
        setWork(data);
        if (data.title) {
          getWikipediaSummary(data.title).then(setWiki);
        }
      })
      .catch(() => setError('Failed to load book'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!work) return <p>Loading...</p>;

  const description = typeof work.description === 'string' ? work.description : work.description?.value;

  return (
    <div>
      <h2>{work.title}</h2>
      {description && <p>{description}</p>}
      {wiki && (
        <div>
          <h3>From Wikipedia</h3>
          {wiki.thumbnail && <img src={wiki.thumbnail.source} alt={work.title} />}
          <p>{wiki.extract}</p>
          <a href={wiki.content_urls.desktop.page} target="_blank" rel="noreferrer">
            Read more on Wikipedia
          </a>
        </div>
      )}
    </div>
  );
}

export default BookPage;
