import styles from "./table.module.css";
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

const TableContainer = () => {
    const [rows, setRows] = useState<tableRow[]>( [
        {
            title: "label",
            id: 1,
            value: "",
        },
        {
            title: "label",
            id: 2,
            value: "",
        },
        {
            title: "label",
            id: 3,
            value: "",
        },
        {
            title: "label",
            id: 4,
            value: "",
        }
    ]);
    const [cells, setCells] = useState<string[][]>([["","","",""], ["","","",""]]);
    const [columns, setColumns] = useState<tableCell[]>( [
        {
            title: "Column1",
            id: 1,
            dataType: "string",
        },
        {
            title: "Column2",
            id: 2,
            dataType: "string",
        }
    ]);

    const handleDataTypeChange = (id: number, type: string) => {
        const newColumns : tableCell[] = columns.map((item)=>{
            if(item.id == id){
                item.dataType = type
            }
            return item
        })

        setColumns(newColumns)
    };
    const addColumn = () => {
        let count = columns[columns.length - 1]?.id ? columns[columns.length - 1].id : 0;
        count++
        setColumns([...columns, {
            title: `Column-${count}`,
            id: count,
            dataType: "string",
        }]);
        const newCells = [...cells]
        newCells.push(Array(cells[0].length).fill(""));
        setCells(newCells);
    };
    const addRow = () => {
        let count = rows[rows.length - 1]?.id ? rows[rows.length - 1].id : 0;
        count++;
        setRows([...rows, {
            title: `Row-${count}`,
            id: count,
            value: ""
        }]);
        const newCels = [...cells]
        newCels.map((item)=>{
            item.push("")
        })
        setCells(newCels)
    };
    const removeRow = (id: number ) => {
        setRows(rows.filter((item) => item.id !== id));
        setCells(cells.map((item) => {
           return item.filter((it,index) => index !== id -1)
        }));
    };
    const removeColumn = (id: number) => {
        setColumns(columns.filter((item) => item.id !== id));
        setCells(cells.filter((it,index) => index !== id -1))
    };
    const handleCellChange = (rowIndex: number, cellIndex: number, value: string) => {
        const newCells = [...cells];
        newCells[cellIndex][rowIndex] = value;
        setCells(newCells);
        console.log(newCells)
    };
    const handleGenerateJson = ()=>{
        const jsonObj  = [...columns]
        jsonObj.map((item, index)=>{item.rows = cells[index]})
        console.log(JSON.stringify(jsonObj, null, 2));
    }

    return (
        <section className={styles.containerTable}>
            <form action="">
                <table className={styles.table} >
                    <thead className={styles.table__head}>
                    <tr className={styles.table__row}>
                        {columns.map(({title, id}) => (
                            <th className={styles.table__col}  key={id}>
                                    <span>{title}</span>
                                    <select
                                        onChange={(evt) => handleDataTypeChange(id, evt.target.value)}

                                    >
                                        <option value="string">Строка</option>
                                        <option value="percent">%</option>
                                    </select>
                                    <button
                                        onClick={() => removeColumn(id)}
                                        className={`${styles.table__btn} ${styles.table__btn_remove}`}
                                                                                type={"button"}>Удалить</button>
                            </th>
                        ))}
                        <th className={styles.table__col}>
                            <button
                                className={`${styles.table__btn} ${styles.table__btn_add}`}
                                type={"button"}
                                onClick={addColumn}
                            >Добавить Столбец</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map(({id}) => (
                        <tr className={styles.table__row} key={id}>
                            {columns.map((cell, cellIndex) => (
                                <td className={styles.table__col}  key={cellIndex}>
                                    <input
                                        onChange={(evt) => handleCellChange(id-1, cellIndex, evt.target.value)}
                                         type={cell.dataType === "string" ? "string" : "number"} className={styles.table__input}/>
                                </td>
                            ))}
                            <td className={styles.table__col}>
                                <button
                                    className={`${styles.table__btn} ${styles.table__btn_remove}`}
                                    onClick={()=>removeRow(id)} type={"button"}>Удалить</button>
                            </td></tr>
                    ))}
                    </tbody>
                </table>
            </form>
            <div className={styles.btnContainer}>
                <button
                    className={`${styles.table__btn} ${styles.table__btn_add}`}
                    type={"button"}
                    onClick={addRow}>Добавить Строку
                </button>
                <button onClick={handleGenerateJson} className={`${styles.table__btn} ${styles.table__btn_add}`} >Сгенерировать JSON</button>
            </div>
        </section>
    );
};

export default TableContainer;
