import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

interface TestData {
  name: string;
  created: string;
  expiry: string;
}

const data: TestData[] = [
  { name: 'License 1', created: '2023-01-01T00:00:00Z', expiry: '2024-01-01T00:00:00Z' },
  { name: 'License 2', created: '2023-02-01T00:00:00Z', expiry: '2024-02-01T00:00:00Z' },
];

const columns = [
  { header: 'Name', accessor: 'name' as keyof TestData },
  { header: 'Created At', accessor: 'created' as keyof TestData, render: (value: string) => new Date(value).toLocaleString() },
  { header: 'Expires At', accessor: 'expiry' as keyof TestData, render: (value: string) => new Date(value).toLocaleString() },
];

describe('Table Component', () => {
  it('renders table headers correctly', () => {
    render(<Table data={data} columns={columns} />);

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  it('renders table rows correctly', () => {
    render(<Table data={data} columns={columns} />);

    data.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(new Date(row.created).toLocaleString())).toBeInTheDocument();
      expect(screen.getByText(new Date(row.expiry).toLocaleString())).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', () => {
    const pageSize = 1;
    render(<Table data={data} columns={columns} pageSize={pageSize} />);

    // Check if the first page is rendered correctly
    expect(screen.getByText(data[0].name)).toBeInTheDocument();
    expect(screen.queryByText(data[1].name)).not.toBeInTheDocument();

    // Go to the next page
    fireEvent.click(screen.getByText('Next'));

    // Check if the second page is rendered correctly
    expect(screen.getByText(data[1].name)).toBeInTheDocument();
    expect(screen.queryByText(data[0].name)).not.toBeInTheDocument();

    // Go back to the previous page
    fireEvent.click(screen.getByText('Previous'));

    // Check if the first page is rendered correctly again
    expect(screen.getByText(data[0].name)).toBeInTheDocument();
    expect(screen.queryByText(data[1].name)).not.toBeInTheDocument();
  });

  it('disables Previous button on the first page', () => {
    render(<Table data={data} columns={columns} pageSize={1} />);

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables Next button on the last page', () => {
    const pageSize = 1;
    render(<Table data={data} columns={columns} pageSize={pageSize} />);

    // Go to the last page
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Next')).toBeDisabled();
  });
});
