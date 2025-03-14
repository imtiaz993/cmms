import Link from "next/link";

const ManHours = ({ manHoursData, superUsers }) => {
  return (
    <div className="md:mt-1 grid grid-cols-2 md:grid-cols-3 gap-5">
      {manHoursData &&
        manHoursData?.map((item, i) => (
          <div className="p-5 rounded-lg shadow-custom bg-bg_secondary border">
            <p className="text-sm font-medium">
              {parseFloat((item?.manHours).toFixed(5))} Hours
            </p>
            <p className="mt-2 text-sm">
              Performed By:{" "}
              {
                superUsers?.find((user) => user?._id === item?.performedBy)
                  ?.name
              }
            </p>
            <p className="mt-2 text-sm">
              <Link
                href={`/admin/work-orders/${item?.workOrder}`}
                target="_blank"
              >
                View Work Order
              </Link>
            </p>
          </div>
        ))}
    </div>
  );
};

export default ManHours;
