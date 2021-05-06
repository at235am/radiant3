import { useCallback, useEffect, useMemo, useState } from "react";

export type OrderType = "ascend" | "descend" | "none";

export interface SortType {
  key: string;
  orderType: OrderType;
}

export interface Column {
  key: string;
  label: string;
  width: number;
  format: ((value: any) => any) | null;
  sorted: OrderType;
}

export type ColumnProps = Partial<Column> & Pick<Column, "key">;

export type TableProps = {
  data: object[];
  column: ColumnProps[];
  defaultColumnWidth?: number;
};

const sortFn = (sortType: SortType) => {
  const { key, orderType } = sortType;
  let order = 1;

  if (orderType === "ascend") order = -1;

  return (a: any, b: any) => {
    const x: any = a[key];
    const y: any = b[key];

    if (x > y) return order;
    else if (x < y) return -order;
    else return 0;
  };
};

const useTable = (
  data: object[],
  column: ColumnProps[],
  defaultColumnWidth = 150
) => {
  const addDefaultValues = useCallback((objs: ColumnProps[]): Column[] => {
    const columns: Column[] = [];

    objs.map(({ key, label, width, format }, i: number) => {
      columns.push({
        key,
        label: label ? label : key,
        width: width ? width : defaultColumnWidth,
        format: format ? format : null,
        sorted: "none",
      });
    });

    return columns;
  }, []);

  const [columnAttrs, setColumnAttrs] = useState(addDefaultValues(column));
  const [tableData, setTableData] = useState(data);
  const [sorts, setSorts] = useState<SortType[] | []>([]);
  const [shiftHeld, setShiftHeld] = useState(false);
  // const [columnHighlight, setColumnHighlight] = useState("");

  /**
   * Reorders the columns based on some inputs.
   * @param targetKey represents the key of the column that will move to the new position.
   * @param newPosition represents the the new position that the column will end up in.
   */
  const changeColumnOrder = (targetKey: string, newPosition: number) => {
    const targetIndex = columnAttrs.findIndex(({ key }) => key === targetKey);

    if (targetIndex === -1) return;

    const targetColumn = columnAttrs[targetIndex];

    const arrayWithDeletedTarget = [
      ...columnAttrs.slice(0, targetIndex),
      ...columnAttrs.slice(targetIndex + 1, columnAttrs.length),
    ];

    setColumnAttrs([
      ...arrayWithDeletedTarget.slice(0, newPosition),
      targetColumn,
      ...arrayWithDeletedTarget.slice(
        newPosition + 1,
        arrayWithDeletedTarget.length
      ),
    ]);
  };

  /**
   * Applies sorts based on multiple 'columns' or keys. The sorts get
   * applied such that the key that calls this function first has the
   * most "effect" or precedence.
   * @param key represents the key of the 'column' to sort.
   * @param reverse you can reverse the precedence of the sorts.
   */
  const toggleMultiSort = (key: string, reverse = false) => {
    const index = sorts.findIndex((item) => item.key === key);

    // add a new sort:
    if (index === -1) {
      // note: the insertion of ...val affects the precedence of
      setSorts((val) =>
        reverse
          ? [...val, { key, orderType: "descend" }]
          : [{ key, orderType: "descend" }, ...val]
      );

      setColumnAttrs((cols) => {
        return cols.map((col) =>
          col.key === key ? { ...col, sorted: "descend" } : col
        );
      });
    } else {
      const prevSort = sorts[index];
      // remove the prevSort:
      if (prevSort.orderType === "ascend") {
        setSorts((val) => [
          ...val.slice(0, index),
          ...val.slice(index + 1, val.length),
        ]);
        setColumnAttrs((cols) => {
          return cols.map((col) =>
            col.key === key ? { ...col, sorted: "none" } : col
          );
        });
      }
      // update the prevSort:
      else {
        setSorts((val) => [
          ...val.slice(0, index),
          {
            ...prevSort,
            orderType: "ascend",
          },
          ...val.slice(index + 1, val.length),
        ]);
        setColumnAttrs((cols) => {
          return cols.map((col) =>
            col.key === key ? { ...col, sorted: "ascend" } : col
          );
        });
      }
    }
  };

  /**
   * Applies a sort based on only one column or key at a time.
   * @param key represents the key of the 'column' to sort.
   */
  const toggleSort = (key: string) => {
    // there hasn't been a sort yet:
    if (sorts.length === 0) {
      setSorts([{ key, orderType: "descend" }]);
      setColumnAttrs((cols) =>
        cols.map((col) =>
          col.key === key ? { ...col, sorted: "descend" } : col
        )
      );
      return;
    }

    const prev = { ...sorts[0] };

    if (prev.key === key) {
      // advance the sort ordering ( descend -> ascend -> none):

      // theres no way for prev.orderType to be "none" since we always
      // remove the element from the 'sorts' array if its orderType is "none"
      // therefore the following ternary is sufficient:
      const newOrderType = prev.orderType === "ascend" ? "none" : "ascend";

      setSorts(newOrderType === "none" ? [] : [{ key, orderType: "ascend" }]);
      setColumnAttrs((cols) =>
        cols.map((col) =>
          col.key === key ? { ...col, sorted: newOrderType } : col
        )
      );
    } else {
      setSorts([{ key, orderType: "descend" }]);

      setColumnAttrs((cols) => {
        // set prev key to "none"
        const prevIndex = cols.findIndex((item) => item.key === prev.key);
        const prevCol = cols[prevIndex];

        const updatedCols = [
          ...cols.slice(0, prevIndex),
          { ...prevCol, sorted: "none" },
          ...cols.slice(prevIndex + 1, cols.length),
        ];

        // set current key to "descend":
        const currentIndex = updatedCols.findIndex((item) => item.key === key);
        const currentCol = updatedCols[currentIndex];

        return [
          ...updatedCols.slice(0, currentIndex),
          { ...currentCol, sorted: "descend" },
          ...updatedCols.slice(currentIndex + 1, updatedCols.length),
        ] as Column[];
      });
    }
  };

  const shiftSort = (key: string) => {
    if (shiftHeld) toggleMultiSort(key);
    else toggleSort(key);
  };

  useEffect(() => {
    const setShiftHeldValue = (e: KeyboardEvent, value: boolean) => {
      if (e.key === "Shift") setShiftHeld(value);
    };

    const on = (e: KeyboardEvent): void => setShiftHeldValue(e, true);
    const off = (e: KeyboardEvent): void => setShiftHeldValue(e, false);

    window.addEventListener("keydown", on);
    window.addEventListener("keyup", off);

    return () => {
      window.removeEventListener("keydown", on);
      window.removeEventListener("keyup", off);
    };
  }, []);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setColumnAttrs(addDefaultValues(column));
  }, [column]);

  useEffect(() => {
    let copyOfOriginalData = [...data];

    sorts.forEach((sortType) => {
      const sortFunction = sortFn(sortType);
      copyOfOriginalData.sort(sortFunction);
    });

    setTableData(copyOfOriginalData);
  }, [sorts]);

  return {
    columnAttrs,
    setColumnAttrs,
    tableData,
    setTableData,
    sorts,
    setSorts,
    changeColumnOrder,
    toggleMultiSort,
    toggleSort,
    shiftSort,
    shiftHeld,
  };
};

export default useTable;
