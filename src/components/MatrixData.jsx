import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import React from "react";

export const MatrixData = ({ matrix, handleChangeValue, handleAdd, handleRemove }) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            {matrix.map((row, indexRow) => {
              return (
                <TableRow key={`row-${indexRow}`}>
                  {row.map((cell, indexCell) => (
                    <TableCell key={`cell-${indexCell}`}>
                      <TextField
                        type="number"
                        value={cell}
                        name={`textField-${indexRow}-${indexCell}`}
                        id={`textField-${indexRow}-${indexCell}`}
                        onChange={handleChangeValue}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Grid
          container
          component="div"
          direction="row"
          justifyContent="flex-end"
          alignItems="stretch"
        >
          <Grid item component="div">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              <AddSharpIcon />
            </Button>
          </Grid>
          <Grid item component="div">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRemove}
            >
              <RemoveSharpIcon />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
