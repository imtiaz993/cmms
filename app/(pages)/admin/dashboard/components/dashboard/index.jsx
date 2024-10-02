import { Card } from "antd";

const Dashboard = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card
        loading={false}
        title={
          <p className="text-sm md:text-base">
            Unplanned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 30 days)</sup>
          </p>
        }
        extra={
          <p className="cursor-pointer text-secondary text-xs md:text-sm">
            View All
          </p>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        title={
          <p className="text-sm md:text-base">
            Planned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 30 days)</sup>
          </p>
        }
        extra={
          <p className="cursor-pointer text-secondary text-xs md:text-sm">
            View All
          </p>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        title={
          <p className="text-sm md:text-base">
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
          <p className="text-sm md:text-base">
            Planned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 3 months)</sup>
          </p>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        title={<p className="text-sm md:text-base">Projected Man Hours</p>}
        extra={
          <p className="cursor-pointer text-secondary text-xs md:text-sm">
            View Schdeule
          </p>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        title={<p className="text-sm md:text-base">Asset Downtime</p>}
      >
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Dashboard;
