import Button from "@/components/common/Button";
import { ExportOutlined } from "@ant-design/icons";
import { Badge, Modal, Table } from "antd";

const ViewAssetsDetailsPopup = ({ visible, setVisible, columns, data }) => {
  return (
    <div>
      <Modal
        maskClosable={false}
        title={
          <div className="flex gap-3">
            <Badge count={5}>
              <h1 className="text-lg md:text-2xl mb-5">Assets </h1>
            </Badge>
            <Button
              outlined
              size="small"
              text="Add Asset"
              fullWidth={false}
              className="!text-xs !h-7 ml-3"
            />
            <Button
              outlined
              size="small"
              text="Export"
              fullWidth={false}
              className="!text-xs !h-7"
              prefix={<ExportOutlined />}
            />
          </div>
        }
        open={visible}
        onCancel={() => setVisible(false)}
        footer={
          <div className="">
            <Button
              onClick={() => setVisible(false)}
              outlined
              size="small"
              text="Cancel"
              fullWidth={false}
            />
          </div>
        }
        width={1000}
      >
        <Table
          loading={false}
          size={"medium"}
          columns={columns}
          dataSource={data}
          pagination={{
            total: data.total,
            current: 1,
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: () => {},
          }}
          style={{
            marginTop: 16,
            overflow: "auto",
          }}
        />
      </Modal>
    </div>
  );
};

export default ViewAssetsDetailsPopup;
