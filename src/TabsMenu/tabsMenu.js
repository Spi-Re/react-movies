import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import './tabsMenu.css';

const { TabPane } = Tabs;

function TabsMenu() {
  return (
    <Tabs defaultActiveKey="1" centered tabBarGutter="16">
      <TabPane tab="Search" key="1" />
      <TabPane tab="Rated" key="2" />
    </Tabs>
  );
}

export default TabsMenu;
