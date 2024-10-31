import Image from "next/image";
import styles from "./header.module.css";
import logo from "./images/logo.svg";

const Header = () => {
    return (
        <header className={styles.header}>
            <section className={styles.headerSection}>
                <h1 className={styles.headerSection__title}>Тестовое задание</h1>
                <p className={styles.headerSection__desc}>Frontend-разработчик: Михайлов Станислав Сергеевич</p>
            </section>
            <Image className={styles.headerSection__logo} src={logo} alt="Логотип" />
        </header>
    );
};

export default Header;
