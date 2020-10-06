import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import JsonToForm from "json-reactform";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const SteinStore = require("stein-js-client");
const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

export interface SimpleDialogProps {
  open: boolean;
  onClose: (params) => void;
}

export default function AddDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { open, onClose } = props;

  const handleClose = () => {
    onClose(false);
  };
  const date = new Date().toDateString();

  const onSubmit = (params) => {
    store
      .append("list", [
        {
          area_provinsi: params.Provinsi.toUpperCase(),
          area_kota: params.Kota.toUpperCase(),
          komoditas: params.Komoditas,
          size: params.Size,
          price: params.Price,
          tgl_parsed: new Date(),
          timestamp: Date.parse(date) / 1000,
        },
      ])
      .then((res) => {
        onClose(true);
        console.log(res);
      });
    // onClose();
  };

  const form = {
    Provinsi: {
      type: "text",
      required: true,
    },
    Kota: {
      type: "text",
      required: true,
    },
    Size: {
      type: "number",
      required: true,
    },
    Komoditas: {
      type: "text",
      required: true,
    },
    Price: {
      type: "number",
      required: true,
    },
    Save: {
      type: "submit",
    },
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Tambahkan Data</DialogTitle>
      <DialogContent>
        <div style={{ width: "400px" }}>
          <JsonToForm model={form} onSubmit={onSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
