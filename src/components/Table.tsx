// styling:
import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import Debug from "./Debug";

// icons:
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import useTable, { TableProps } from "../hooks/useTable";

const Container = styled.div`
  position: relative;
`;

const TableContainer = styled.table`
  position: absolute;
  top: 0;

  text-align: left;

  display: flex;
  flex-direction: column;
`;

const Thead = styled.thead`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Tbody = styled.tbody`
  display: flex;
  flex-direction: column;

  /* margin: 0 1rem; */

  tr:nth-of-type(2n + 1) {
    background-color: ${({ theme }) => theme.colors.onSurface.main};
  }
  tr:nth-of-type(2n) {
    background-color: ${({ theme }) => theme.colors.onBackground.main};
  }
`;

const HeaderRow = styled.tr`
  padding: 0 1rem;
  height: 5rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.onSurface.main};

  background-color: ${({ theme }) => theme.colors.onBackground.main};
  display: flex;
`;

const HeaderColumn = styled.th`
  position: relative;
  ${({ columnWidth }: { columnWidth: number }) =>
    css`
      width: ${columnWidth}px;
      min-width: ${columnWidth}px;
      max-width: ${columnWidth}px;
    `}

  white-space: nowrap;

  height: 100%;
  padding: 0 1rem;

  cursor: default;

  color: ${({ theme }) => theme.colors.surface.main};

  display: flex;
  align-items: center;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    path {
      fill: ${({ theme }) => theme.colors.primary.main};
    }
  }

  p {
    position: absolute;
    top: 0;
    left: 0;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const borderRadius = 5;

const Row = styled(motion.tr)`
  padding: 0 1rem;
  height: 3rem;

  /* padding: 1rem 2rem; */
  /* margin: 0.5rem 0; */
  /* border-radius: 5px; */
  /* background-color: ${({ theme }) => theme.colors.surface.main}; */

  /* box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1); */

  /* overflow: hidden; */
  display: flex;
  /* align-items: center; */

  &:hover {
    /* box-shadow: inset 0px 0px 0px 1px
      ${({ theme }) => theme.colors.onBackground.main}; */
  }
`;

const Column = styled.td`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  height: 100%;
  padding: 0 1rem;

  cursor: default;

  color: ${({ theme }) => theme.colors.background.main};
  font-size: 0.9rem;

  ${({ columnWidth }: { columnWidth: number }) =>
    css`
      width: ${columnWidth}px;
      min-width: ${columnWidth}px;
      max-width: ${columnWidth}px;
    `}

  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    overflow: visible;
  }
`;

const Table = ({ data, column }: TableProps) => {
  const {
    changeColumnOrder,
    toggleMultiSort,
    toggleSort,
    columnAttrs,
    tableData,
    shiftHeld,
    shiftSort,
  } = useTable(data, column, 150);

  return (
    <>
      <Debug data={shiftHeld} />
      <button onClick={() => changeColumnOrder("name", columnAttrs.length - 1)}>
        slkdjflksdjf
      </button>
      {/* <Debug data={columnAttrs} /> */}
      <Container>
        <TableContainer
        // onMouseLeave={() => setColumnHighlight("")}
        >
          <Thead>
            {/* <Div></Div> */}
            <HeaderRow>
              {columnAttrs.map(
                ({ key, label, width, format, sorted }, i: number) => (
                  <HeaderColumn
                    // highlight={key === columnHighlight}
                    key={`header-column-${i}`}
                    columnWidth={width}
                    // onMouseEnter={(e) => setColumnHighlight(key)}
                    onClick={() => shiftSort(key)}
                  >
                    {label}
                    {sorted === "ascend" && <MdKeyboardArrowUp />}
                    {sorted === "descend" && <MdKeyboardArrowDown />}
                  </HeaderColumn>
                )
              )}
            </HeaderRow>
          </Thead>
          <Tbody>
            {tableData.map((row: any, i: number) => (
              <Row key={`body-row-${i}`}>
                {columnAttrs.map(({ key, label, width, format }, j: number) => (
                  <Column
                    columnWidth={width}
                    key={`body-column-${i}-${j}`}
                    // onMouseEnter={(e) => setColumnHighlight(key)}
                  >
                    {format ? format(row[key]) : row[key]}
                  </Column>
                ))}
              </Row>
            ))}
          </Tbody>
        </TableContainer>
      </Container>
    </>
  );
};

export default Table;
