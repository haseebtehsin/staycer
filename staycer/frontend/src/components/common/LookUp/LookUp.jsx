import React, { Component } from "react";
import Pagination from "../Pagination";
import Spinner from "react-bootstrap/Spinner";
import "./LookUp.module.css";
import NotFound from "../NotFound";

//TODO: Handle Errors
class LookUp extends Component {
  state = {
    data: {},
    currentPage: 1,
    pageSize: 10,
    totalCount: 1,
    fetchingData: false,
    searchText: null,
  };

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getPageOffset = (pageNumber) => {
    return pageNumber === 1 ? 0 : (pageNumber - 1) * this.state.pageSize;
  };

  setFetching = (value) => {
    this.setState({ fetchingData: value });
  };

  onSearch = (searchText) => {
    this.setState({ currentPage: 1, searchText: searchText });
    this.fetchData(1);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.fetchData(page);
  };

  componentDidMount() {
    this.fetchData(this.state.currentPage);
  }

  renderEmpty() {
    return <NotFound />;
  }

  renderFetchingData() {
    return (
      <div
        className="d-flex  flex-column justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <React.Fragment>
          <Spinner animation="border" />
        </React.Fragment>
      </div>
    );
  }

  renderPagination() {
    const { pageSize, currentPage, totalCount } = this.state;
    return (
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        handlePageChange={this.handlePageChange}
      />
    );
  }
}

export default LookUp;
