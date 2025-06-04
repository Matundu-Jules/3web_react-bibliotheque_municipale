import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { advancedSearch, searchBooks } from '../api/openLibrary';
import SearchResults from '../components/SearchResults';
import { SearchDoc } from '../types/OpenLibrary';

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [error, setError] = useState('');
  const q = params.get('q') || '';

  useEffect(() => {
    if (q) {
      searchBooks(q)
        .then((res) => setDocs(res.docs))
        .catch(() => setError('Search failed'));
    }
  }, [q]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (data.q) {
      setParams(data);
      advancedSearch(data)
        .then((res) => setDocs(res.docs))
        .catch(() => setError('Search failed'));
    }
  };

  return (
    <div>
      <h2>Search</h2>
      <form onSubmit={onSubmit}>
        <input name="q" placeholder="Search" defaultValue={q} />
        <input name="author" placeholder="Author" />
        <input name="subject" placeholder="Subject" />
        <button type="submit">Advanced Search</button>
      </form>
      {error && <p>{error}</p>}
      <SearchResults docs={docs} />
    </div>
  );
}

export default SearchPage;
