import { Card } from "antd";

const Dashboard = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card
        loading={false}
        title={
          <p>
            Unplanned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 30 days)</sup>
          </p>
        }
        extra={<p className="cursor-pointer text-secondary">View All</p>}
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        title={
          <p>
            Planned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 30 days)</sup>
          </p>
        }
        extra={<p className="cursor-pointer text-secondary">View All</p>}
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        title={
          <p>
            Unplanned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 3 months)</sup>
          </p>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        title={
          <p>
            Planned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 3 months)</sup>
          </p>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        title={"Projected Man Hours"}
        extra={<p className="cursor-pointer text-secondary">View Schdeule</p>}
      >
        <p>Card content</p>
      </Card>
      <Card loading={false} title={"Asset Downtime"}>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Dashboard;
