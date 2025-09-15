import React from "react";
import { Pagination } from "antd";

const Pageination = ({ page, setPage, limit, total, data }) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
      {/* Showing text */}
      <div className="text-sm text-gray-700">
        Showing {data?.length > 0 ? (page - 1) * limit + 1 : 0} to{" "}
        {Math.min(page * limit, total)} of {total} properties
      </div>

      {/* Pagination control */}
      <Pagination
        current={page}
        pageSize={limit}
        total={total}
        onChange={(newPage) => setPage(newPage)}
        showSizeChanger={false}
        showQuickJumper
      />
    </div>
  );
};

export default Pageination;
