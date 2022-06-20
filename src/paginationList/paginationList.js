import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './pagination-list.css';

function PaginationList() {
  return <Pagination className="pagination-list" size="small" total={50} />;
}

export default PaginationList;
