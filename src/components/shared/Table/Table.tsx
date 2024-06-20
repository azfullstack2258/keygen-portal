import React, { useState, ReactNode } from 'react';
import type { Column } from '../../../typings/ui';

export interface TableProps<T> {
  data: T[];
  columns: Array<Column<T>>;
  pageSize?: number;
}

const Table = <T extends {}>({ data, columns, pageSize = 10 }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border px-4 py-2">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  {column.render ? column.render(row[column.accessor], row) : row[column.accessor] as unknown as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
