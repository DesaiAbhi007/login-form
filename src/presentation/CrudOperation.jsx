import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import validation from "../utils/validation";

const CrudOperation = () => {
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState({});

  const [error, setError] = useState({});
  const [dataRow, setDataRow] = useState(() => {
    const storedData = localStorage.getItem("item");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [editIndex, setEditIndex] = useState(null);

  const formAttribute = [
    {
      name: "name",
      label: "Full Name",
      pattern: "checkName",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      pattern: "checkEmail",
    },
    {
      name: "number",
      label: "Mo. number",
      type: "text",
      pattern: "checkMobileNumber",
    },
  ];
  
  const handleSaveData = (e) => {
    e.preventDefault();
    let newErr = {};
    
    // EMPTY FIELD CHECK KRVA
    formAttribute.forEach((item) => {
      newErr[item.name] = validation(item.name, item.pattern, formData[item.name]);
    });
    
    setError((prev) => ({ ...prev, ...newErr }));
    
    if (Object?.values(newErr)?.every((el) => el === undefined)) {
      
      if (editIndex === null || editIndex === undefined) {
        dataRow.push(formData);
        localStorage.setItem("item", JSON.stringify(dataRow));
      } else {
        const updatedData = [...dataRow];
        updatedData[editIndex] = formData;
        setDataRow(updatedData);
        localStorage.setItem("item", JSON.stringify(updatedData));
        setEditIndex(null);
      }
      setFormData({});
    }
  };

  const handleDelete = (index) => {
    const updatedData = dataRow.filter((_, i) => i !== index);

    setDataRow(updatedData);
    localStorage.setItem("item", JSON.stringify(updatedData));

    setError({});
    setFormData({});
    setOpen({show: false});
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    console.log("editIndex", editIndex);
    setFormData(dataRow[index]);
    setEditIndex(index);
    setError({});
    console.log("editIndex", index);
  };

  const handleChange = (e, pattern) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: validation(name, pattern, value) }));
  };


  const handleClickOpen = (i) => {
    setOpen({show: true, id:i});
  };
  const handleClose = () => {
    setOpen({show: false});
  };

  return (
    <>
      <Stack p={3}>
        <form onSubmit={handleSaveData}>
          <Stack spacing={3} direction="row" mb={4}>
            {formAttribute?.map((val, i) => (
              <TextField
                key={i}
                type={val?.type || "text"}
                label={val?.label}
                name={val?.name}
                value={formData[val?.name] || ""}
                variant="standard"
                onChange={(e) => handleChange(e, val.pattern)}
                helperText={error?.[val?.name]}
                error={error?.[val?.name]}
              />
            ))}
            <Button variant="contained" type="submit" sx={{ height: "100%" }}>
              {editIndex !== null ? "Update" : "Save"}
            </Button>
          </Stack>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:700, fontSize:18}}>Name</TableCell>
              <TableCell sx={{fontWeight:700, fontSize:18}}>Mobile No.</TableCell>
              <TableCell sx={{fontWeight:700, fontSize:18}}>Email</TableCell>
              <TableCell sx={{fontWeight:700, fontSize:18}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRow?.map((obj, i) => (
              <TableRow key={i}>
                <TableCell>{obj?.name}</TableCell>
                <TableCell>{obj?.number}</TableCell>
                <TableCell>{obj?.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(i)} color="primary">
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton onClick={()=>handleClickOpen(i)} color="error">
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
       <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open.show}
        maxWidth="lg"
      >
        <DialogContent dividers>
          <Typography fontWeight={400} color="error">Are you sure want to delete?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleClose}>
            No
          </Button>
          <Button variant="contained" autoFocus onClick={()=> handleDelete(open.id)}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CrudOperation;
