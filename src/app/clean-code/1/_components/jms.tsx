"use client";
import { heavyComputation } from "@/utils/heavyComputation";
import React, { useState, useEffect } from "react";

// TypeScript interfaces
interface Item {
  id: number;
  name: string;
  value: number;
  createdAt?: Date;
}

interface UserInfo {
  id: number;
  name: string;
  dataCount: number;
}

interface ProblematicListProps {
  items: Item[];
  onItemClick: (item: Item & { timestamp: Date }) => void;
  onDeleteItem: (itemId: number) => void;
  onAddItem: () => void;
  counter: number;
}

const ListSection = ({
  onItemCountChange,
  counter,
}: {
  onItemCountChange: (count: number) => void;
  counter: number;
}) => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Item 1", value: 10 },
    { id: 2, name: "Item 2", value: 20 },
    { id: 3, name: "Item 3", value: 30 },
  ]);

  useEffect(() => {
    onItemCountChange(items.length);
  }, [items.length]);

  const handleItemClick = (item: Item & { timestamp: Date }): void => {
    console.log("Item clicked:", item);
  };

  const addItem = (): void => {
    const newId = Math.max(...items.map((item) => item.id), 0) + 1;
    const newItem: Item = {
      id: newId,
      name: `Item ${items.length + 1}`,
      value: Math.floor(Math.random() * 50) + 10,
      createdAt: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (itemId: number): void => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <ProblematicList
      items={items}
      onItemClick={handleItemClick}
      onDeleteItem={handleDeleteItem}
      onAddItem={addItem}
      counter={counter}
    />
  );
};

const ProblematicList = ({
  items,
  onItemClick,
  onDeleteItem,
  onAddItem,
}: ProblematicListProps) => {
  return (
    <div className="bg-slate-800 border border-slate-600 p-4 rounded">
      <h3 className="font-bold text-red-300 mb-2">ProblematicList</h3>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4 block"
        onClick={() => {
          onAddItem();
        }}
      >
        Add Item to List
      </button>
      {items.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          onItemClick={onItemClick}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </div>
  );
};

const ListItem = ({
  item,
  onItemClick,
  onDeleteItem,
}: {
  item: Item;
  onItemClick: (item: Item & { timestamp: Date }) => void;
  onDeleteItem: (itemId: number) => void;
}) => {
  return (
    <div
      className="border border-slate-600 bg-slate-700 p-2 m-1 cursor-pointer hover:bg-slate-600 rounded"
      onClick={() => {
        onItemClick({ ...item, timestamp: new Date() });
      }}
    >
      <span className="text-slate-200">{item.name}</span>
      <button
        className="ml-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
        onClick={(e) => {
          e.stopPropagation();
          const shouldDeleteWrong = Math.random() > 0.7;
          if (shouldDeleteWrong) {
            onDeleteItem(item.id - 1);
          } else {
            onDeleteItem(item.id);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const TimestampDisplay = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p className="text-sm text-slate-300">Current Time: {currentTime}</p>;
};

const SessionInfo = ({ sessionId }: { sessionId: string }) => {
  return <p className="text-sm text-slate-300">Session ID: {sessionId}</p>;
};

const CounterSection = ({
  counter,
  onCounterChange,
}: {
  counter: number;
  onCounterChange: (newCounter: number) => void;
}) => {
  useEffect(() => {
    console.log("Counter section rendered:", counter);
  });

  return (
    <div className="bg-slate-800 border border-slate-600 p-4 rounded">
      <h3 className="font-bold text-green-300 mb-4">Counter Section</h3>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 block"
        onClick={() => {
          onCounterChange(counter + 1);
        }}
      >
        Increment Counter
      </button>
      <p className="text-2xl font-bold text-white">Count: {counter}</p>
    </div>
  );
};

const DataCountDisplay = ({ count }: { count: number }) => {
  return (
    <div className="bg-slate-600 p-3 rounded">
      <p className="text-slate-200">
        <span className="font-semibold text-yellow-300">Data count:</span>{" "}
        <span className="text-2xl font-bold text-white">{count}</span> items
      </p>
    </div>
  );
};

const UserManagementBox = ({
  itemCount,
  userId,
  onUserIdChange,
}: {
  itemCount: number;
  userId: number;
  onUserIdChange: (newUserId: number) => void;
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setUserInfo({
        id: userId,
        name: `User${userId}`,
        dataCount: itemCount,
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [userId]);

  useEffect(() => {
    if (userInfo) {
      setUserInfo((prev) => (prev ? { ...prev, dataCount: itemCount } : null));
    }
  });

  useEffect(() => {
    if (userInfo && !loading) {
      console.log(
        `User ${userInfo.id} connected with ${userInfo.dataCount} items`
      );
    }
  });

  return (
    <div className="bg-slate-800 border border-slate-600 p-6 rounded">
      <h3 className="font-bold text-cyan-300 mb-4">User Management</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-slate-300">
            User ID:
            <input
              type="number"
              value={userId}
              onChange={(e) => {
                const newUserId = parseInt(e.target.value) || 1;
                onUserIdChange(newUserId);
              }}
              className="ml-2 px-2 py-1 border border-slate-600 bg-slate-700 text-white rounded"
            />
          </label>
        </div>
        <div className="flex-1">
          <DataCountDisplay count={itemCount} />
        </div>
      </div>

      <div className="bg-slate-700 border border-slate-500 p-4 rounded">
        {loading ? (
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-600 rounded w-1/2"></div>
            </div>
            <p className="text-slate-400 mt-2">Connecting user...</p>
          </div>
        ) : userInfo ? (
          <div>
            <p className="text-green-400 font-semibold mb-2">
              ✅ User with id "{userInfo.id}" connected
            </p>
            <p className="text-blue-300 font-medium">
              Welcome user name "{userInfo.name}"
            </p>
          </div>
        ) : (
          <p className="text-slate-400">No user connected</p>
        )}
      </div>
    </div>
  );
};

const Divider = () => <div className="border-t border-slate-600 my-6"></div>;

export const JmsCode2Component = (): JSX.Element => {
  const [itemCount, setItemCount] = useState<number>(3);
  const [timestamp, setTimestamp] = useState<number>(Date.now());
  const [counter, setCounter] = useState<number>(0);
  const [userId, setUserId] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Main component rendered at", new Date().toLocaleTimeString());
  });

  const expensiveSessionId: string = (() => {
    heavyComputation();
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  })();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-slate-900 min-h-screen text-white flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        Buggy React App - Find the Performance Issues!
      </h1>

      <Divider />

      <div className="bg-slate-800 border border-slate-600 p-4 rounded">
        <h3 className="font-bold text-purple-300 mb-2">System Info</h3>
        <TimestampDisplay />
        <SessionInfo sessionId={expensiveSessionId} />
      </div>

      <Divider />

      <CounterSection
        counter={counter}
        onCounterChange={(newCounter: number) => {
          setCounter(newCounter);
        }}
      />

      <Divider />

      <ListSection
        counter={counter}
        onItemCountChange={(count: number) => {
          setItemCount(count);
        }}
      />

      <Divider />

      <UserManagementBox
        itemCount={itemCount}
        userId={userId}
        onUserIdChange={(newUserId: number) => {
          setUserId(newUserId);
        }}
      />
    </div>
  );
};
