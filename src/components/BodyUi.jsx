import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { MatrixResult } from "./MatrixResult";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MatrixData from "./MatrixData";
import React from "react";
import Tree from "react-d3-tree";
import useBodyUi from "./use-bodyUi";

const BodyUi = (props) => {
  const {
    data,
    tree,
    result,
    alert,
    handleAlertClose,
    handleResult,
    handleChangeMatrixValue,
    handleMatrixAdd,
    handleMatrixRemove,
  } = useBodyUi({
    init: {
      data: [
        [0, 2, 0, 6, 0],
        [2, 0, 3, 8, 5],
        [0, 3, 0, 0, 7],
        [6, 8, 0, 0, 9],
        [0, 5, 7, 9, 0],
      ],
      result: [],
    },
  });
  return (
    <Box sx={{ m: 1, p: 2, height: "100%" }} minHeight="100%">
      <Typography variant="body1" component="div">
        Data:
      </Typography>
      <Box>
        <MatrixData
          matrix={data}
          onChangeValue={handleChangeMatrixValue}
          onAdd={handleMatrixAdd}
          onRemove={handleMatrixRemove}
          readOnlyMode="mainDiagonal"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          endIcon={<AccountTreeIcon />}
          onClick={handleResult}
        >
          Get minimal expansion tree
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <MatrixResult
          data={result}
          columns={["source", "destiny", "cost"]}
          title="NEAR"
        />
      </Box>
      <Box sx={{ height: "100%" }} minHeight="100%">
        <Tree
          data={tree}
          orientation="vertical"
          nodeSize={{ x: 200, y: 200 }}
        />
      </Box>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          The size of matrix must be 2 or more!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BodyUi;
