import { Rate } from 'antd';
import 'antd/dist/antd.css';
import './star-rate.css';

function StarsRate() {
  return <Rate allowHalf count="10" defaultValue={0} className="rate" />;
}

export default StarsRate;
