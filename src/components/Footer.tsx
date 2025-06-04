import styles from './Footer.module.scss';

function Footer() {
  return <footer className={styles.footer}>© {new Date().getFullYear()} Municipal Library</footer>;
}

export default Footer;
