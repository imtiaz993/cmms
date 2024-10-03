import Link from "next/link";
import { Card } from "antd";

const Dashboard = ({ activeLocation }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-8 pb-4 pt-3">
      <Card
        loading={false}
        className="!bg-primary"
        title={
          <p className="text-sm md:text-base">
            Unplanned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 30 days)</sup>
          </p>
        }
        extra={
          <Link
            href={`/admin/dashboard?tab=work-orders&location=${activeLocation}`}
            className="cursor-pointer text-secondary text-xs md:text-sm"
          >
            View All
          </Link>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        className="!bg-primary"
        title={
          <p className="text-sm md:text-base">
            Planned Work Orders{" "}
            <sup className="text-xs font-normal">(Last 30 days)</sup>
          </p>
        }
        extra={
          <Link
            href={`/admin/dashboard?tab=work-orders&location=${activeLocation}`}
            className="cursor-pointer text-secondary text-xs md:text-sm"
          >
            View All
          </Link>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        className="!bg-primary"
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
        className="!bg-primary"
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
        className="!bg-primary"
        title={<p className="text-sm md:text-base">Projected Man Hours</p>}
        extra={
          <Link
            href={`/admin/dashboard?tab=schedule&location=${activeLocation}`}
            className="cursor-pointer text-secondary text-xs md:text-sm"
          >
            View Schdeule
          </Link>
        }
      >
        <p>Card content</p>
      </Card>
      <Card
        loading={false}
        className="!bg-primary"
        title={<p className="text-sm md:text-base">Asset Downtime</p>}
      >
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Dashboard;
