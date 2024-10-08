import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Drawer, Input, Tree } from "antd";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location");
  const activeTab = searchParams.get("tab");

  const onSelect = (selectedKeys) => {
    setOpenSidebar(false);
    router.push(
      `/admin/dashboard?tab=${activeTab || "dashboard"}&location=${
        selectedKeys[0]
      }`
    );
  };

  const RigTitle = (title, key) => (
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

  const SystemTitle = (title, key) => (
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
          title: RigTitle("Rig 21", "rig-21"),
          key: "rig-21",
          children: [
            {
              title: SystemTitle("Air System", "system"),
              key: "system 1",
            },
          ],
        },
        {
          title: RigTitle("Rig 22", "rig-22"),
          key: "rig-22",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 2",
            },
          ],
        },
        {
          title: RigTitle("Rig 23", "rig-23"),
          key: "rig-23",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 3",
            },
          ],
        },
        {
          title: RigTitle("Rig 25", "rig-25"),
          key: "rig-25",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 4",
            },
          ],
        },
        {
          title: RigTitle("Rig 26", "rig-26"),
          key: "rig-26",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 5",
            },
          ],
        },
        {
          title: RigTitle("Rig 27", "rig-27"),
          key: "rig-27",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 6",
            },
          ],
        },
        {
          title: RigTitle("Rig 28", "rig-28"),
          key: "rig-28",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 7",
            },
          ],
        },
        {
          title: RigTitle("Rig 29", "rig-29"),
          key: "rig-29",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 8",
            },
          ],
        },
        {
          title: RigTitle("Rig 30", "rig-30"),
          key: "rig-30",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 9",
            },
          ],
        },
        {
          title: RigTitle("Rig 32", "rig-32"),
          key: "rig-32",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 10",
            },
          ],
        },
        {
          title: RigTitle("Rig 34", "rig-34"),
          key: "rig-34",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 11",
            },
          ],
        },
        {
          title: RigTitle("Third Party Repair", "third-party-repair"),
          key: "third-party-repair",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 12",
            },
          ],
        },
        {
          title: RigTitle("Yard", "yard"),
          key: "yard",
          children: [
            {
              title: SystemTitle("System", "system"),
              key: "system 13",
            },
          ],
        },
      ],
    },
  ];

  const [filteredTreeData, setFilteredTreeData] = useState(treeData);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const extractText = (element) => {
    // If it's a string, return as is
    if (typeof element === "string") {
      return element;
    }

    // If it's a JSX element, recursively extract text from children
    if (React.isValidElement(element)) {
      const children = element.props.children;
      if (Array.isArray(children)) {
        return children.map(extractText).join(" ");
      }
      return extractText(children);
    }

    return ""; // Return empty string for anything else
  };

  // Filter tree based on search value
  const onSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const expandedKeys = ["noram-drilling"];

    const filterTree = (data) =>
      data
        .map((item) => {
          const titleText = extractText(item.title).toLowerCase();
          const titleMatch = titleText.includes(value) && value;

          if (item.children) {
            const filteredChildren = filterTree(item.children);
            if (filteredChildren.length > 0 || titleMatch) {
              expandedKeys.push(item.key);
              return {
                ...item,
                children: filteredChildren,
              };
            }
          }

          return titleMatch ? { ...item } : null;
        })
        .filter((item) => item);

    if (!value) {
      setFilteredTreeData(treeData);
    } else {
      setFilteredTreeData(filterTree(treeData));
    }
    setExpandedKeys(expandedKeys);
  };

  return (
    <div>
      <div className="bg-primary min-h-[calc(100dvh-16px-60px)] hidden lg:block lg:w-[300px] rounded-tr-xl p-5 select-none">
        <Input.Search
          placeholder="Search Rigs/Systems"
          onChange={onSearch}
          style={{ marginBottom: 8 }}
        />
        <div>
          <Tree
            expandedKeys={expandedKeys}
            defaultSelectedKeys={[activeLocation || "noram-drilling"]}
            onSelect={onSelect}
            treeData={filteredTreeData}
            rootStyle={{ background: "transparent" }}
            className="custom-tree"
            onExpand={(keys) => setExpandedKeys(keys)}
          />
        </div>
      </div>
      <Drawer
        title=""
        placement={"left"}
        closable={true}
        onClose={() => {
          setOpenSidebar(false);
        }}
        open={openSidebar}
        key={"left"}
        style={{ background: "#313131" }}
      >
        <div className="select-none">
          <div>
            <Input.Search
              placeholder="Search Rigs/Systems"
              onChange={onSearch}
              style={{ marginBottom: 8 }}
            />
            <Tree
              defaultExpandedKeys={[activeLocation || "noram-drilling"]}
              defaultSelectedKeys={[activeLocation || "noram-drilling"]}
              onSelect={onSelect}
              treeData={filteredTreeData}
              rootStyle={{ background: "transparent" }}
              className="custom-tree"
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
