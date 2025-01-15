import { useEffect, useState } from "react";
import { Button, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import validation from "../utils/validation";

const CrudOperation = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [dataRow, setDataRow] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 

  const formAttribute = [
    {
      name: "name",
      label: "Full Name",
      pattern: 'checkName',
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      pattern: 'checkEmail',
    },
    {
      name: "number",
      label: "Mo. number",
      type: "text",
      pattern: 'checkMobileNumber',
    },
  ];


  const handleSaveData = (e) => {
    e.preventDefault();
    let newErr = {}

  // EMPTY FIELD CHECK KRVA 
   formAttribute.forEach((item) => { 
   newErr[item.name] = validation(item.name, item.pattern, formData[item.name]) 

  })
  
  setError((prev) => ({...prev, ...newErr }))

   if(Object?.values(newErr)?.every((el) => el === undefined)) {    
     if (!editIndex) {
      dataRow.push(formData)
      localStorage.setItem('item', JSON.stringify(dataRow));
     } else{
       const updatedData = [...dataRow];
       updatedData[editIndex] = formData;
       setDataRow(updatedData);
       setEditIndex(null);      
     }
     setFormData({})  
   }
   

  };
  
  const handleDelete = (index) => {  
    dataRow.splice(index,1);    
    setDataRow([...dataRow]);
    setError({})
  };


  const handleEdit = (index) => { 
    setFormData(dataRow[index]);
    setEditIndex(index); 
    setError({})
  };

  const handleChange = (e, pattern) => {
    const {name,value} = e.target     
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError((prev) => ({...prev, [name]: validation(name, pattern, value)  }))
  }

  
  
  

  return (
    <>
      <Stack p={3}>
        <form onSubmit={handleSaveData}>
          <Stack spacing={3} direction="row" mb={4}>
            {formAttribute?.map((val,i) => (
              <TextField
                key={i}
                type={val?.type || "text"}
                label={val?.label}
                name={val?.name}
                value={formData[val?.name] || ''}
                variant="standard"
                onChange={(e)=> handleChange(e, val.pattern)}
                helperText={error?.[val?.name]}
                error={error?.[val?.name]}
              />
            ))}
            <Button variant="contained" type="submit" sx={{height:'100%'}}>
              {editIndex !== null ? "Update" : "Save"}
            </Button>
          </Stack>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile No.</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRow?.map((obj, i) => (
              <TableRow key={i}>
                <TableCell>{obj?.name}</TableCell>
                <TableCell>{obj?.number}</TableCell>
                <TableCell>{obj?.email}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleEdit(i)}>
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(i)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </>
  );
};

export default CrudOperation;
