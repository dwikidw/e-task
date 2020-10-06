import React from "react";
import { Search, Close } from "@material-ui/icons";
import "./home.scss";

import { formatRupiah } from "../../utils/helpers";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import Table from "../../components/table/table";

const SteinStore = require("stein-js-client");

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #28b796;
`;

const columns = [
  // {
  //   Header: "No",
  //   id: "rows",
  //   maxWidth: 10,
  //   filterable: false,
  //   Cell: (row) => {
  //     return <div>{row.row.index + 1}</div>;
  //   },
  // },
  {
    Header: "Provinsi",
    accessor: "area_provinsi",
  },
  {
    Header: "Kota",
    accessor: "area_kota",
  },
  {
    Header: "Komoditas",
    accessor: "komoditas",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: (row) => {
      const price = formatRupiah(row.value);
      return <div>{price}</div>;
    },
  },
  {
    Header: "Date",
    accessor: "tgl_parsed",
    Cell: (row) => {
      const date = new Date(row.value).toLocaleDateString();
      return <div>{date}</div>;
    },
  },
  {
    Header: "Last Update",
    accessor: "timestamp",
    Cell: (row) => {
      const date = new Date(row.value * 1000).toLocaleDateString();
      return <div>{date}</div>;
    },
  },
];

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

export default class Home extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      result: [],
      otherList: [],
      sizeList: [],
      size: 0,
      loading: false,
      showMessage: false,
    };
  }

  componentDidMount() {
    this.getList();
    this.getSizeList();
  }

  componentDidUpdate() {}

  getList() {
    store.read("list", { offset: 1 }).then((res) => {
      this.setState({
        result: res,
      });
    });
  }

  getSizeList() {
    store.read("option_size", { offset: 1 }).then((res) => {
      this.setState({
        sizeList: res,
      });
    });
  }

  handleInput = (e) => {
    const query = e.target.value;
    if (!query) {
      this.setState({
        query: query,
        showMessage: false,
        otherList: [],
      });
    } else {
      this.setState({
        query: query,
      });
    }
  };

  handleSearch = (event) => {
    const { query } = this.state;

    const code = event.keyCode || event.which;
    const click = event.type;
    console.log(query);

    if (code === 13 || click === "click") {
      this.setState({
        loading: true,
        showMessage: false,
      });

      store
        .read("list", {
          offset: 1,
          search: { area_provinsi: query.toUpperCase() },
        })
        .then((res) => {
          this.setState({
            otherList: res,
            loading: false,
            showMessage: false,
          });
          if (query && res.length === 0) {
            this.setState({
              showMessage: true,
            });
          }
        })
        .catch((e) => console.log(e));
    }
  };

  handleSelect = (val) => {
    const value = val.target.value;
    if (value !== 0) {
      this.setState({ size: value, loading: true });
      store
        .read("list", {
          offset: 1,
          search: { size: value },
        })
        .then((res) => {
          this.setState({
            otherList: res,
            loading: false,
          });
        })
        .catch((e) => console.log(e));
    }
  };

  handleClear = () => {
    this.setState({
      query: "",
      size: 0,
      otherList: [],
      showMessage: false,
    });
  };

  render() {
    const {
      query,
      result,
      otherList,
      loading,
      showMessage,
      sizeList,
      size,
    } = this.state;

    return (
      <section style={{ marginTop: "6rem" }}>
        <div className="container">
          <div className="filter-wrap">
            <OutlinedInput
              id="outlined-search"
              type="text"
              value={query}
              placeholder="Cari Provinsi..."
              onChange={this.handleInput}
              onKeyPress={this.handleSearch}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="toggle search"
                    onClick={this.handleSearch}
                    edge="end"
                  >
                    <Search fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
            />
            <div
              style={{
                flex: 1,
                margin: "0 8px",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormControl
                variant="outlined"
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Select
                  style={{ minWidth: "50px", marginRight: "8px" }}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={size}
                  onChange={this.handleSelect}
                >
                  <MenuItem value={0} style={{ color: "grey" }}>
                    Size
                  </MenuItem>
                  {sizeList.map((res) => {
                    return (
                      <MenuItem
                        key={res.size + "size"}
                        value={res.size}
                        style={{ color: "grey" }}
                      >
                        {res.size}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {query || size !== 0 ? (
                <IconButton
                  size="small"
                  aria-label="toggle clear"
                  onClick={this.handleClear}
                >
                  <Close fontSize="small" />
                </IconButton>
              ) : null}
            </div>
            <BeatLoader
              css={override}
              size={10}
              color={"#28B796"}
              loading={loading}
            />
            <div style={{ color: "grey" }}>
              {showMessage ? "data tidak ditemukan" : ""}
            </div>
          </div>
          <Table
            columns={columns}
            data={otherList.length === 0 ? result : otherList}
          />
        </div>
      </section>
    );
  }
}
