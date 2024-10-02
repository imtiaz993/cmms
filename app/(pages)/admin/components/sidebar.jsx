import Image from "next/image";
import { Tree } from "antd";

const RigTitle = (title) => (
  <div className="flex items-center p-1">
    <Image
      src="/images/buildings.png"
      alt="Buildings"
      width={100}
      height={100}
      className="w-5 h-5 mr-2"
    />
    <p>{title}</p>
  </div>
);

const SystemTitle = (title) => (
  <div className="flex items-center p-1">
    <Image
      src="/images/buildings.png"
      alt="Buildings"
      width={100}
      height={100}
      className="w-5 h-5 mr-2"
    />
    <p className="text-sm">{title}</p>
  </div>
);

const treeData = [
  {
    title: <p className="text-lg font-medium p-1">NORAM Drilling</p>,
    key: "noram-drilling",
    children: [
      {
        title: RigTitle("Rig 21"),
        key: "rig-21",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 1",
          },
        ],
      },
      {
        title: RigTitle("Rig 22"),
        key: "rig-22",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 2",
          },
        ],
      },
      {
        title: RigTitle("Rig 23"),
        key: "rig-23",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 3",
          },
        ],
      },
      {
        title: RigTitle("Rig 25"),
        key: "rig-25",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 4",
          },
        ],
      },
      {
        title: RigTitle("Rig 26"),
        key: "rig-26",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 5",
          },
        ],
      },
      {
        title: RigTitle("Rig 27"),
        key: "rig-27",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 6",
          },
        ],
      },
      {
        title: RigTitle("Rig 28"),
        key: "rig-28",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 7",
          },
        ],
      },
      {
        title: RigTitle("Rig 29"),
        key: "rig-29",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 8",
          },
        ],
      },
      {
        title: RigTitle("Rig 30"),
        key: "rig-30",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 9",
          },
        ],
      },
      {
        title: RigTitle("Rig 32"),
        key: "rig-32",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 10",
          },
        ],
      },
      {
        title: RigTitle("Rig 34"),
        key: "rig-34",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 11",
          },
        ],
      },
      {
        title: RigTitle("Third Party Repair"),
        key: "third-party-repair",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 12",
          },
        ],
      },
      {
        title: RigTitle("Yard"),
        key: "yard",
        children: [
          {
            title: SystemTitle("System"),
            key: "system 13",
          },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  return (
    <div className="bg-primary min-h-[calc(100dvh-16px-60px)] hidden lg:block lg:w-[300px] rounded-tr-xl p-5  select-none">
      <div>
        <Tree
          defaultExpandedKeys={["noram-drilling"]}
          defaultSelectedKeys={["noram-drilling"]}
          onSelect={onSelect}
          treeData={treeData}
          rootStyle={{ background: "transparent" }}
          className="custom-tree"
        />
      </div>
    </div>
  );
};

export default Sidebar;
