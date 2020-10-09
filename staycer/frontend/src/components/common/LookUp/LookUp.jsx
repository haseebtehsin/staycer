import React, { Component } from "react";
import Pagination from "../Pagination";
import "./LookUp.module.css";
import NotFound from "../NotFound";
import Spinner from "../../common/Spinner";

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
    return <Spinner />;
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
