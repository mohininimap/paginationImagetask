
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./dialogue.css"
export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit,getUsers,setTableData,removeImage}) {
  let [nameError, setNameError] = useState(false);
  let [karatError, setKaratError] = useState(false);
  let [weightError, setWeightError] = useState(false);
  let [priceError, setPriceError] = useState(false);

let { id, name, karat, weight, price,image} = data;
console.log(data)


  return (

    <div>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{id ? "Update Product" : "Create New Product"}</DialogTitle>
        <DialogContent>
          <form action="">
            <TextField onChange={e => onChange(e,setNameError)} margin="dense" pattern="^[a-zA-Z]" type="text"  value={name} name="name" placeholder="Enter name" label="name" fullWidth required />
            {nameError?<span className='nameError'>*Please Enter Name</span>:""} 

            <TextField onChange={e => onChange(e,setKaratError)} margin="dense" type="number" name="karat" max={1} value={karat} placeholder="Karat" label="karat" fullWidth required />
            {karatError?<span className='karatError'>*Please Enter Karat</span>:""}

            <TextField onChange={e => onChange(e,setWeightError)} margin="dense" type="number" name="weight" value={weight} placeholder="Weight" label="weight" fullWidth required />
           {weightError?<span className='weightError'>*Please Enter Weight</span>:""} 

            <TextField onChange={e => onChange(e,setPriceError)} margin="dense" type="number" name="price" value={price} placeholder="Price" label="price" fullWidth required />
           {priceError?<span className='priceError'>*Please Enter Price</span>:""} 

            <input id="file1" type="file" name="image" onChange={e => onChange(e)} />

  <input style={{width:"200px",borderColor:"#fff",outline:"none",border:"none"}} type="text" value={image}/>{image ?<span  onClick={()=>removeImage(data.image)}>X</span>:""}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant='outlined'>Cancel</Button>
          <Button 
          disabled={nameError ||name.length===0||karat.length===0||weight.length===0||price.length===0|| karatError || weightError || priceError}
           onClick={() => handleFormSubmit(setNameError)} variant='contained' color="primary">{id ? "Update" : "Submit"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}