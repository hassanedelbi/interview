"use client";
import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  department: string;
  salary: number;
}

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  departmentStats: { avgSalary: number; count: number };
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "salary">("name");

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const departments = [
        "Engineering",
        "Marketing",
        "Sales",
        "HR",
        "Finance",
      ];
      const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        phone: `${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 9000) + 1000}`,
        website: `user${i + 1}.com`,
        department: departments[Math.floor(Math.random() * departments.length)],
        salary: Math.floor(Math.random() * 80000) + 40000,
      }));

      setUsers(mockUsers);
    };
    fetchUsers();
  });

  const startFilterTime = performance.now();
  const filteredUsers = users.filter((user) => {
    for (let i = 0; i < 1000000; i++) {
      Math.random();
    }
    return user.name.toLowerCase().includes(filter.toLowerCase());
  });
  const filterTime = performance.now() - startFilterTime;

  const startSortTime = performance.now();
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    for (let i = 0; i < 50000; i++) {
      Math.random();
    }
    if (sortBy === "salary") {
      return b.salary - a.salary;
    }
    return a.name.localeCompare(b.name);
  });
  const sortTime = performance.now() - startSortTime;

  const startStatsTime = performance.now();
  const departmentStats = users.reduce((acc, user) => {
    for (let i = 0; i < 10000; i++) {
      Math.random();
    }

    if (!acc[user.department]) {
      acc[user.department] = { totalSalary: 0, count: 0 };
    }
    acc[user.department].totalSalary += user.salary;
    acc[user.department].count += 1;
    return acc;
  }, {} as Record<string, { totalSalary: number; count: number }>);

  const departmentAvgStats = Object.entries(departmentStats).reduce(
    (acc, [dept, stats]) => {
      acc[dept] = {
        avgSalary: Math.round(stats.totalSalary / stats.count),
        count: stats.count,
      };
      return acc;
    },
    {} as Record<string, { avgSalary: number; count: number }>
  );
  const statsTime = performance.now() - startStatsTime;

  const handleEdit = (user: User) => {
    console.log("Editing user:", user.name);
    // Simulate edit logic
  };

  const handleDelete = (userId: number) => {
    console.log("Deleting user:", userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="p-5 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">User Directory</h1>

      <div className="mb-4 text-sm grid grid-cols-2 gap-4">
        <div className="text-white">
          <p>Total users: {users.length}</p>
          <p>Filtered users: {sortedUsers.length}</p>
        </div>
        <div className="text-xs text-gray-300">
          <p>Filter time: {filterTime.toFixed(2)}ms</p>
          <p>Sort time: {sortTime.toFixed(2)}ms</p>
          <p>Stats time: {statsTime.toFixed(2)}ms</p>
          <p className="font-semibold text-white">
            Total: {(filterTime + sortTime + statsTime).toFixed(2)}ms
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-400"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "salary")}
          className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
        >
          <option value="name">Sort by Name</option>
          <option value="salary">Sort by Salary</option>
        </select>
      </div>

      <div className="grid gap-3 max-h-[calc(100vh-300px)] overflow-y-auto">
        {sortedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            departmentStats={
              departmentAvgStats[user.department] || { avgSalary: 0, count: 0 }
            }
          />
        ))}
      </div>
    </div>
  );
};

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  departmentStats,
}) => {
  console.log(`Rendering UserCard for ${user.name}`);

  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-gray-800 hover:bg-gray-700 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-gray-300">
            {user.email} |{" "}
            <span className="font-medium text-blue-400">{user.department}</span>
          </p>
          <p className="text-sm text-gray-300">
            Salary:{" "}
            <span className="font-semibold text-green-400">
              ${user.salary.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 ml-2">
              (Dept avg: ${departmentStats.avgSalary.toLocaleString()})
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user)}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
