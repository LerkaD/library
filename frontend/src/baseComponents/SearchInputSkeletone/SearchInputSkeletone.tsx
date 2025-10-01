'use client'
import styles from './SearchInputSkeletone.module.scss';

export default function SearchInputSkeleton() {
    return (
        <div className="containerMainPage">
            <div className={styles.mainContainer}>
                <div className={styles.searchBarContainer}>
                    <div className={styles.searchInputSkeleton}></div>
                    <div className={styles.searchButtonSkeleton}></div>
                </div>
            </div>
        </div>
    );
}
