// styling:
import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Debug from "./Debug";

// icons:
import { BiCaretDownCircle } from "react-icons/bi";
import useTable, { Column, TableProps } from "../hooks/useTable";
import useRenderCount from "../hooks/useRenderCount";
import useResizeObserver from "use-resize-observer/polyfilled";
import { table } from "node:console";
import SearchBar from "./TableSearchBar";

const Container = styled.div`
  /* border: 1px solid yellow; */
  position: relative;
  /* overflow: auto; */
`;

const TableContainer = styled.table`
  min-width: 100%;
  /* border: 2px solid orange; */
  position: absolute;
  top: 0;

  text-align: left;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.onBackground.main};
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 100;

  /* border-bottom: 1px solid ${({ theme }) => theme.colors.onSurface.main}; */

  background-color: ${({ theme }) => theme.colors.onBackground.main};
  opacity: 0.94;
  backdrop-filter: blur(2px);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tbody = styled.tbody`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* background-color: ${({ theme }) => theme.colors.onBackground.main}; */

  ${({ tableHeight }: { tableHeight: number }) => css`
    height: ${tableHeight}px;
    min-height: ${tableHeight}px;
    max-height: ${tableHeight}px;
  `}

  /* margin: 0 1rem; */

  tr {
    /* position: relative; */
    border-top: 1px solid ${({ theme }) => theme.colors.onSurface.main};

    padding: 0 1rem;
    height: 3rem;

    display: flex;

    td {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      height: 100%;
      padding: 0 1rem;

      cursor: default;

      color: ${({ theme }) => theme.colors.background.main};
      font-size: 0.9rem;

      display: flex;
      align-items: center;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  tr:nth-of-type(odd) {
    /* background-color: ${({ theme }) => theme.colors.onSurface.main}; */
  }

  tr:nth-of-type(even) {
    /* background-color: ${({ theme }) => theme.colors.onBackground.main}; */
  }

  tr {
    /* background-color: ${({ theme }) => theme.colors.onBackground.main}; */
  }

  tr:hover {
    /* box-shadow: inset 0px 0px 0px 1px */
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: 5px;
    td {
      color: ${({ theme }) => theme.colors.onPrimary.main};
      /* background-color: transparent; */
      font-weight: 600;
    }
    /* background-color: transparent; */
  }
`;

const HeaderRow = styled.tr`
  padding: 0 1rem;
  height: 5rem;

  background-color: ${({ theme }) => theme.colors.onBackground.main};
  background-color: transparent;

  display: flex;
`;

const HeaderColumn = styled.th`
  ${({ columnWidth }: { columnWidth: number }) =>
    css`
      width: ${columnWidth}px;
      min-width: ${columnWidth}px;
      max-width: ${columnWidth}px;
    `}

  cursor: default;
  user-select: none;
  position: relative;

  white-space: nowrap;
  /* word-break: break-word; */

  height: 100%;
  padding: 0 1rem;
  font-size: 12px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.surface.main};

  display: flex;
  align-items: center;

  &:hover {
    /* background-color: red; */
    text-decoration: underline;
  }
`;

// transform: translateY(${({ tHeight }: { tHeight: number }) => tHeight}px);
const Row = styled(motion.tr)`
  position: absolute;
  top: ${({ tHeight }: { tHeight: number }) => tHeight}px;

  transition: top 1000ms linear;
`;

const BlankRow = styled.tr`
  ${({ blankHeight }: { blankHeight: number }) => css`
    height: ${blankHeight}px;
    min-height: ${blankHeight}px;
    max-height: ${blankHeight}px;
  `}
`;

const ZeroHeightRow = styled.tr`
  height: 0px;
  max-height: 0px;
  min-height: 0px;
`;

const DataColumn = styled.td`
  ${({ columnWidth }: { columnWidth: number }) =>
    css`
      width: ${columnWidth}px;
      min-width: ${columnWidth}px;
      max-width: ${columnWidth}px;
    `}
`;

const TooltipContainer = styled(motion.div)`
  /* opacity: 0.5; */
  position: absolute;
  top: 0;
  left: 0;
  /* left: -0.5rem; */
  padding: 2px;
  z-index: 10;
  /* padding-left: 0; */

  /* text-decoration: underline; */
  font-size: 0.9rem;
  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.primary.main};
  border: 1px solid white;
  border-radius: 3px;

  opacity: 0;
`;

const indicatorIconSize = 16;

type SortIndicatorProps = {
  orderType: string;
};

const SortIndicator = styled(motion.span)<SortIndicatorProps>`
  width: ${indicatorIconSize}px;
  height: ${indicatorIconSize}px;
  min-width: ${indicatorIconSize}px;
  min-height: ${indicatorIconSize}px;
  max-width: ${indicatorIconSize}px;
  max-height: ${indicatorIconSize}px;
  margin-left: 3px;

  svg {
    width: 100%;
    height: 100%;
    /* position: absolute; */
    /* top: 0; */
    /* left: 0; */
    path {
      transition: 100ms fill linear;
      fill: ${({ orderType, theme }) =>
        orderType === "ascend"
          ? theme.colors.correct.main
          : theme.colors.error.light};
    }
  }
`;

const BlankBigTable = styled.tbody`
  width: 1708px;
  min-width: 1708px;
  max-width: 1708px;

  height: 9100px;
  min-height: 9100px;
  max-height: 9100px;

  background-color: pink;

  display: flex;
`;

interface RowItemProps {
  // cKey: string;
  data: any;
  columnAttrs: Column[];
  index: number;
}

interface DataPieceProps {
  // rowData: any;
  columnData: Column;
  text: any;
}

const DataPiece = memo(({ columnData, text }: DataPieceProps) => {
  return (
    <DataColumn title={text} columnWidth={columnData.width}>
      {text}
    </DataColumn>
  );
});

const RowItem = memo(({ data, columnAttrs, index }: RowItemProps) => {
  return (
    <tr>
      {/* <Row style={{ position: "absolute", top: `${index * 14 * 3}px` }}> */}
      {columnAttrs.map((columnData: Column, j: number) => (
        <DataPiece
          key={`body-column-${data.name}-${columnData.key}`}
          columnData={columnData}
          text={
            columnData.format
              ? columnData.format(data[columnData.key])
              : data[columnData.key]
          }
        ></DataPiece>
      ))}
    </tr>
  );
});

const Table = memo(({ data, column }: TableProps) => {
  const {
    changeColumnOrder,
    toggleMultiSort,
    toggleSort,
    toggleShiftSort,
    columnAttrs,
    tableData,
    shiftHeld,
    sorts,
    filterData,
  } = useTable(data, column, 150);

  const [searchText, setSearchText] = useState("");

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(document.getElementById("root"));
  const { width = 0, height = 0 } = useResizeObserver({ ref: scrollRef });
  const [extraContentHeight, setExtraContentHeight] = useState(0);
  // const tableDimensions = useResizeObserver({ ref: scrollRef });

  // 14 comes from theme.dimensions.unit or 1rem
  const itemHeight = 14 * 3; // 3rem

  const listHeight = itemHeight * tableData.length;

  const startIndex = Math.max(
    0, // ensures that we get an index of atleast 0
    Math.floor((scrollPosition - extraContentHeight) / itemHeight)
  );

  const endIndex = Math.max(
    0, //  ensures that we get atleast an index of 0 in the case that:
    // scrollTop + height < extraContentHeight
    Math.min(
      tableData.length - 1, // don't render past the end of the list
      Math.floor((scrollPosition + height - extraContentHeight) / itemHeight)
    )
  );

  const sortIndicatorVariant = useMemo(
    () => ({
      descend: {
        rotate: 0,
        scale: 1,
      },
      ascend: {
        rotate: 180,
        scale: 1,
      },

      none: {
        // rotate: 0,
        // scale: 0,
        rotate: [180, 360, 360, 360],
        scale: [1, 1, 0, 0],
      },
    }),
    []
  );

  useEffect(() => {
    scrollRef.current = document.getElementById("page-container");
    const setScrollTopRef = () =>
      setScrollPosition(scrollRef.current?.scrollTop as number);

    scrollRef.current?.addEventListener("scroll", setScrollTopRef);

    return () => {
      scrollRef.current?.removeEventListener("scroll", setScrollTopRef);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const fullHeight = scrollRef.current.scrollHeight;
      setExtraContentHeight(fullHeight - listHeight);
    }
  }, [height, width, listHeight]);

  useEffect(() => {
    console.log("column in Table.tsx changed");
  }, [column]);

  useEffect(() => {
    console.log("data in Table.tsx changed");
  }, [data]);

  useEffect(() => {
    filterData(searchText);
  }, [searchText]);

  return (
    <>
      {/* <Debug
        drag
        data={{
          scrollPosition: Math.round(scrollPosition),
          startIndex,
          endIndex,
          itemsShown: endIndex - startIndex + 1,
          windowHeight: height,
          windowWidth: width,
          listHeight: listHeight,
          extraContentHeight,
        }}
      /> */}
      <SearchBar
        value={searchText}
        onChange={(e: any) => setSearchText(e.target.value)}
        placeholderText="Look for your favorite player, team, mouse, and more!"
        results={`${tableData.length} result${
          tableData.length === 1 ? "" : "s"
        }`}
      />
      <Container className="Table-Container">
        <TableContainer>
          <Thead>
            <HeaderRow>
              <AnimatePresence>
                {columnAttrs.map(
                  ({ key, label, width, format, sorted, abbr }, i: number) => (
                    <HeaderColumn
                      key={`header-column-${i}`}
                      columnWidth={width}
                      onClick={() => toggleShiftSort(key)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        toggleMultiSort(key);
                      }}
                    >
                      {abbr ? abbr : label}

                      <SortIndicator
                        orderType={sorted}
                        variants={sortIndicatorVariant}
                        initial={sorted}
                        animate={sorted}
                      >
                        <BiCaretDownCircle />
                      </SortIndicator>
                    </HeaderColumn>
                  )
                )}
              </AnimatePresence>
            </HeaderRow>
          </Thead>
          <Tbody tableHeight={listHeight}>
            {/* <ZeroHeightRow /> */}
            <BlankRow blankHeight={startIndex * itemHeight} />
            {tableData.map((row: any, i: number) => {
              if (i >= startIndex && i <= endIndex)
                return (
                  <RowItem
                    key={`data-row-${row.name}`}
                    // ckey={`body-row-${i}`}
                    columnAttrs={columnAttrs}
                    data={tableData[i]}
                    index={i}
                  />
                );
              // else return <tr key={`data-row-${row.name}`} />;
            })}
            <BlankRow
              blankHeight={(tableData.length - (endIndex + 1)) * itemHeight}
            />
          </Tbody>
        </TableContainer>
      </Container>
    </>
  );
});

export default Table;
