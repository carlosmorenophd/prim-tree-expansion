import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

export const MatrixResult = ({ data }) => {
  const content =
    data.length === 0 ? (
      <Skeleton variant="rectangular" width="100%" height={60} />
    ) : (
      <Table>
        <TableBody>
          {data.map((row, indexRow) => {
            return (
              <TableRow  key={`row-${indexRow}`}>
                {row.map((cell, indexCell) => (
                  <TableCell key={`cell-result-matrix-${indexRow}-${indexCell}`}>{cell}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  return <Box>{content}</Box>;
};
