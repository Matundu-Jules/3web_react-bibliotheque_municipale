import { Link } from 'react-router-dom';
import { SearchDoc } from '../types/OpenLibrary';
import styles from './SearchResults.module.scss';

interface Props {
  docs: SearchDoc[];
}

function SearchResults({ docs }: Props) {
  if (!docs.length) {
    return <p>No results found.</p>;
  }

  return (
    <ul className={styles.results}>
      {docs.map((doc) => (
        <li key={doc.key} className={styles.item}>
          <Link to={`/book/${doc.key.replace('/works/', '')}`}>{doc.title}</Link>
          {doc.author_name && <span className={styles.author}> by {doc.author_name.join(', ')}</span>}
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
