import styles from '../styles/Loader.module.css'

const Loader = () => {
	return (
		<div className={styles.loader}>
			<div className={styles['loader-inner']}></div>
		</div>
	);
};

export default Loader;
