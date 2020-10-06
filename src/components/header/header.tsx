import { Button } from "@material-ui/core";
import React, { Component } from "react";
import logo from "../../assets/images/logo.png";
import AddDialog from "../dialog/dialog";
import "./header.scss";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [success, setAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (params) => {
    setOpen(false);
    if (params) {
      setAlert(true);
    }
  };

  return (
    <section className="header">
      <div className="container header-container">
        <img className="logo" src={logo} alt="" />
        <Button color="secondary" onClick={handleClickOpen}>
          Tambahkan Data
        </Button>
      </div>
      <AddDialog open={open} onClose={handleClose} />
      {success && (
        <Alert
          action={
            <IconButton
              size="small"
              onClick={() => {
                setAlert(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          DATA BERHASIL DITAMBAHKAN
        </Alert>
      )}
    </section>
  );
}
