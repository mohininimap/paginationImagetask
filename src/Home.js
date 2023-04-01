import React, { useState, useEffect } from "react";
import "./home.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormDialogue from "./components/Dialog";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const initialValue = { name: "", karat: "", weight: "", price: "", image: "" };
function Home() {
  const [tableData, setTableData] = useState(false);
  const [formData, setFormData] = useState(initialValue);
  const baseurl=`http://localhost:5000`;
  const producturl = `${baseurl}/product`;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
 

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    fetch(producturl)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    tableData && tableData.slice(indexOfFirstProduct, indexOfLastProduct);

  
  const handleFormSubmit = () => {
    if (formData.id) {
    

      fetch(producturl + `/${formData.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        });
    } else {
      fetch(producturl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("resp" + JSON.stringify(resp.name.length));

          if (
            resp.name.length !== 0 ||
            resp.karat.length !== 0 ||
            resp.weight.length !== 0 ||
            resp.price.length !== 0
          ) {
            alert("Product added successfully");
          }
          handleClose();
          getUsers();
        });
    }
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this row",
      id
    );
    if (confirm) {
      fetch(producturl + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };
  const handleUpdate = (data) => {
    setFormData(data);
    handleClickOpen();
  };

  const removeImage = (image) => {
    console.log("mmmmm" + tableData);
   
    setFormData({
      ...formData,
      image: "",
    });
  };

  const onChange = (e, err) => {
    e.preventDefault();
    if (e.target.name == "name") {
      e.target.value.length === 0 ? err(true) : err(false);
    }

    if (e.target.name == "karat") {
      e.target.value > 24 ? err(true) : err(false);
    }

    if (e.target.name == "weight") {
      e.target.value.length === 0 ? err(true) : err(false);
    }

    if (e.target.name == "price") {
      e.target.value.length === 0 ? err(true) : err(false);
    }

    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,

      image: e.target.type === "file" && "./" + e.target.files[0].name,
    });
    console.log(" e.target" + value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const selectPageHandler = (selectedPage) => {
    console.log("*********" + selectedPage);
    if (selectedPage >= 1 && selectedPage <= tableData.length / 5)
      setCurrentPage(selectedPage);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tableData.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div  class="row justify-content-md-end top-div">

        <div class="col-lg-3">
          <p className="title-product ">Products List</p>
        </div>

        <div  class="col-lg-2 addproduct-div text-end">
          <Button
            size="small"
            style={{marginLeft:"25px"}}
            className="btn-addproduct mb-2"
            onClick={handleClickOpen}
            variant="outlined"
            startIcon={<AddIcon size="small" />}
          >
            Add Product
          </Button>
        </div>

        <div style={{width:"170px"}} class="col-lg-2 text-end "> 
        <ReactHTMLTableToExcel
      
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-sm btn-outline-primary text-start mb-2"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="DOWNLOAD AS XLS"
          
                    />
        </div>
       
      </div>

      <div>
        <table id="table-to-xls" className="table table-bordered caption-top producttable">
          <thead>
            <tr>
              <th className="head" scope="col">
                <input type="checkbox" />
              </th>
              <th className="head" scope="col">ID</th>
              <th className="head" scope="col">NAME</th>
              <th className="head" scope="col">KARAT</th>
              <th className="head" scope="col">WEIGHT</th>
              <th className="head" scope="col">PRICE</th>
              <th className="head" scope="col">IMAGE</th>
              <th className="head" scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
           
              currentProducts &&
                currentProducts.map((item) => (
                  <tr key={item?.id}>
                    <>
                      <th scope="row">
                        {" "}
                        <input
                          type="checkbox"
                          checked={item.image ? true : false}
                        />
                      </th>

                      <th className="head-id" scope="row">{item?.id}</th>
                      <td>{item?.name}</td>
                      <td>{item?.karat}</td>
                      <td>{item?.weight}</td>
                      <td>{item?.price}</td>
                      <td>
                        <img
                          src={item.image.length > 0 ? item.image : ""}
                          height="20px"
                        />
                      </td>
                      <td>
                       
                        <DeleteIcon
                          onClick={() => handleDelete(item.id)}
                          size="small"
                          color="error"
                        />
                      
                        <EditIcon
                          className="editicon"
                          onClick={() => handleUpdate(item)}
                          size="small"
                          color="primary"
                        />
                       
                      </td>
                    </>
                  </tr>
                ))
            }
          </tbody>
        </table>
        <FormDialogue
          open={open}
          handleClose={handleClose}
          data={formData}
          onChange={onChange}
          handleFormSubmit={handleFormSubmit}
          setTableData={setTableData}
          removeImage={removeImage}
        />

       
        <div>
          <nav className="pagination pagination-sm">
            <ul>
              <span
             
                onClick={() => selectPageHandler(currentPage - 1)}
                className={currentPage > 1 ? "" : "pagination__disable"}
              >
                <ArrowBackIosIcon fontSize="5px" size="small" color="action" />
              </span>
              {pageNumbers.map((number,i) => (
                <>
                  <li  key={number} className="page-item">
                    <a
                  
                      onClick={() => paginate(number)}
                      href="!#"
                      
                      className={["page-link",currentPage === i + 1 ? "pagination__selected" : ""].join(" ")}
                    >
                      {number}
                    </a>
                  </li>
                </>
              ))}
              <span
                onClick={() => selectPageHandler(currentPage + 1)}
                className={
                  currentPage < Math.ceil(tableData.length / productsPerPage)
                    ? ""
                    : "pagination__disable"
                }
              >
                <ArrowForwardIosIcon fontSize="5px" color="action" size="small"/>
              </span>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Home;
