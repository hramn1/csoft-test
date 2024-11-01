import styles from './table.module.css';
import {useState} from 'react';

type tableCell = {
    title: string,
    id: number,
    dataType?: string,
    value?: string,
    rows?: string[]
}
type tableRow = {
    title: string,
    id: number,
    value: string,
}

function TableContainer() {
    const [rows, setRows] = useState<tableRow[]>([
        {
            title: 'Row-1',
            id: 1,
            value: '',
        },
        {
            title: 'Row-2',
            id: 2,
            value: '',
        },
        {
            title: 'Row-3',
            id: 3,
            value: '',
        },
        {
            title: 'Row-4',
            id: 4,
            value: '',
        },
    ]);
    const [cells, setCells] = useState<string[][]>([['', '', '', ''], ['', '', '', '']]);
    const [columns, setColumns] = useState<tableCell[]>([
        {
            title: 'Column1',
            id: 1,
            dataType: 'string',
        },
        {
            title: 'Column2',
            id: 2,
            dataType: 'string',
        },
    ]);

    const handleDataTypeChange = (id: number, type: string) => {
        const newColumns: tableCell[] = columns.map((item) => {
            if (item.id === id) {
                item.dataType = type;
            }
            return item;
        });
        setColumns(newColumns);
    };

    const addColumn = () => {
        let count = columns[columns.length - 1]?.id ? columns[columns.length - 1].id : 0;
        count++;
        setColumns([...columns, {
            title: `Column-${count}`,
            id: count,
            dataType: 'string',
        }]);
        const newCells = [...cells];
        newCells.push(Array(rows.length).fill(''));
        setCells(newCells);
    };
    const addRow = () => {
        let count = rows[rows.length - 1]?.id ? rows[rows.length - 1].id : 0;
        count++;
        setRows([...rows, {
            title: `Row-${count}`,
            id: count,
            value: '',
        }]);
        const newCells = [...cells];
        newCells.map((item) => {
            item.push('');
        });
        setCells(newCells);
    };
    const removeRow = (id: number, rowIndex: number) => {
        setRows(rows.filter((item) => item.id !== id));
        setCells(cells.map((item) => item.filter((it, index) => index !== rowIndex)));
    };
    const removeColumn = (id: number, cellIndex: number) => {
        setColumns(columns.filter((item) => item.id !== id));
        setCells(cells.filter((it, index) => index !== cellIndex));
    };
    const handleCellChange = (rowIndex: number, cellIndex: number, value: string) => {
        const newCells = [...cells];
        newCells[cellIndex][rowIndex] = value;
        setCells(newCells);
    };
    const handleGenerateJson = () => {
        const jsonObj = [...columns];
        jsonObj.map((item, index) => {
            item.rows = cells[index];
        });
        console.log(JSON.stringify(jsonObj, null, 1));
    };

    return (
        <section className={styles.containerTable}>
            <form action="">
                <table className={styles.table}>
                    <thead className={styles.table__head}>
                    <tr className={styles.table__row}>
                        <th className={styles.table__col}>
                            Строки
                        </th>
                        {columns.map(({title, id}, cellIndex) => (
                            <th className={styles.table__col} key={id}>
                                <p>{title}</p>
                                <div className={`${styles.btnContainer} ${styles.btnContainer_top}`}>
                                    <select
                                        className={styles.tableSelect}
                                        onChange={(evt) => handleDataTypeChange(id, evt.target.value)}
                                    >
                                        <option value="string">Строка</option>
                                        <option value="percent">%</option>
                                    </select>
                                    <button
                                        onClick={() => removeColumn(id, cellIndex)}
                                        className={`${styles.table__btn} ${styles.table__btn_remove}`}
                                        type={'button'}
                                    >Удалить
                                    </button>
                                </div>
                            </th>
                        ))}
                        <th className={styles.table__col}>
                            <button
                                className={`${styles.table__btn} ${styles.table__btn_add}`}
                                type={'button'}
                                onClick={addColumn}
                            >Добавить Столбец
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map(({id, title}, rowIndex) => (
                        <tr className={styles.table__row} key={id}>
                            <td className={styles.table__col}>
                                {title}
                            </td>
                            {columns.map((cell, cellIndex) => (
                                <td className={styles.table__col} key={cell.id}>
                                    <input
                                        onChange={(evt) => handleCellChange(rowIndex, cellIndex, evt.target.value)}
                                        type={cell.dataType === 'string' ? 'string' : 'number'}
                                        className={styles.table__input}
                                        placeholder={'Данные'}
                                        value={cells[cellIndex][rowIndex]}
                                    />
                                </td>
                            ))}
                            <td className={styles.table__col}>
                                <button
                                    className={`${styles.table__btn} ${styles.table__btn_remove}`}
                                    onClick={() => removeRow(id, rowIndex)} type={'button'}
                                >Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </form>
            <div className={styles.btnContainer}>
                <button
                    className={`${styles.table__btn} ${styles.table__btn_add}`}
                    type={'button'}
                    onClick={addRow}
                >Добавить Строку
                </button>
                <button
                    onClick={handleGenerateJson}
                    type={'button'}
                    className={`${styles.table__btn} ${styles.table__btn_add}`}
                >Сгенерировать JSON
                </button>
            </div>
        </section>
    );
}

export default TableContainer;

