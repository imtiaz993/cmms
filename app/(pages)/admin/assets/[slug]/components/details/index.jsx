const Details = ({ details }) => {
  return (
    <div className="mt-5">
      <div className="flex gap-5">
        <p className="min-w-32 mt-2">Miscellaneous</p>
        <div className="grid md:grid-cols-2 gap-y-2 gap-x-5 w-full">
          <div className="grid grid-cols-2 border">
            <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
              Serial #
            </p>
            <p className="p-2 md:px-3 md:py-2">{details.serialNumber || "-"}</p>
          </div>
          <div className="grid grid-cols-2 border">
            <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
              Purchased from
            </p>
            <p className="p-2 md:px-3 md:py-2">{"---"}</p>
          </div>

          <div className="grid grid-cols-2 border">
            <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
              Notes
            </p>
            <p className="p-2 md:px-3 md:py-2">{details.notes || "-"}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <p className="min-w-32 mt-2">Custom Fields</p>
        <div className="grid md:grid-cols-2 gap-y-2 gap-x-5 w-full">
          {details?.customFields?.map((field, i) => (
            <div className="grid grid-cols-2 border" key={i}>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
                {field?.name}
              </p>
              <p className="p-2 md:px-3 md:py-2">{field?.value || "-"}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <p className="min-w-32 mt-2">Work Order</p>
        <div className="grid md:grid-cols-2 gap-y-2 gap-x-5 w-full">
          <div className="grid grid-cols-2 border">
            <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
              Maintenance Status
            </p>
            <p className="p-2 md:px-3 md:py-2">
              {details?.maintStatus
                ? details.maintStatus === "damagedBeyondRepair"
                  ? "Damaged Beyond Repair"
                  : details.maintStatus === "outForRepair"
                  ? "Out for repair"
                  : details.maintStatus.charAt(0).toUpperCase() +
                    details.maintStatus.slice(1)
                : "-"}
            </p>
          </div>

          <div className="grid grid-cols-2 border">
            <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
              Criticality
            </p>
            <p className="p-2 md:px-3 md:py-2">{details.criticality || "-"}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <p className="min-w-32 mt-2">Creation</p>
        <div className="grid md:grid-cols-2 gap-y-2 gap-x-5 w-full">
          <div className="grid grid-cols-2 border">
            <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
              Date Installed
            </p>
            <p className="p-2 md:px-3 md:py-2">{"---"}</p>
          </div>
          <div className="grid grid-cols-2 border">
            <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r">
              Created by
            </p>
            <p className="p-2 md:px-3 md:py-2">{"---"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
