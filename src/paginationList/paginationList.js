import { Pagination } from 'antd';
import { Component } from 'react';
import 'antd/dist/antd.css';
import './pagination-list.css';

export default class PaginationList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { currentPage, totalPages = 50, getCurrentPage } = this.props;
    return (
      <Pagination
        className="pagination-list"
        size="small"
        total={totalPages * 10}
        showSizeChanger={false}
        current={currentPage}
        onChange={getCurrentPage}
      />
    );
  }
}
