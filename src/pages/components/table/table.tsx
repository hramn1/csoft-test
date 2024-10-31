import styles from "./table.module.css";

const columns = [
    {
    title: "column1"
},
    {
        title: "column2"
    }
]
const rows = [
    {
        title: "label"
    },
    {
        title: "label"
    },
    {
        title: "label"
    },
    {
        title: "label"
    }
]

const TableContainer = () => {
    return (
        <section className={styles.containerTable}>
            <form action="">
                <table className={styles.table} >
                    <thead className={styles.table__head}>
                    <tr className={styles.table__row}>
                        {columns.map((item, index) => (
                            <th className={styles.table__col}  key={index}>
                                <div >
                                    <span >Столбец</span>
                                    <select>
                                        <option value="string">Строка</option>
                                        <option value="percent">%</option>
                                    </select>
                                    <button type={"button"}>Удалить</button>
                                </div>
                            </th>
                        ))}
                        <th className={styles.table__col}>
                            <button type={"button"}>Добавить Столбец</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr className={styles.table__row} key={rowIndex}>
                            {columns.map((cell, cellIndex) => (
                                <td className={styles.table__col}  key={cellIndex}>
                                    <input
                                    />
                                </td>
                            ))}
                            <td className={styles.table__col}>
                                <button type={"button"}>Удалить</button>
                            </td></tr>
                    ))}
                    </tbody>
                </table>
            </form>
            <div>
                <button>Добавить Строку</button>
                <button>Сгенерировать JSON</button>
            </div>
        </section>
    );
};

export default TableContainer;
