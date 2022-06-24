import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import './tabsMenu.css';

const { TabPane } = Tabs;

function TabsMenu(ratedMovies) {
  return (
    <Tabs defaultActiveKey="1" centered tabBarGutter="16">
      <TabPane tab="Search" key="1" />
      <TabPane tab="Rated" key="2" onClick={() => ratedMovies()} />
    </Tabs>
  );
}

export default TabsMenu;
