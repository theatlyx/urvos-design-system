import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../Table";

describe("Table Component", () => {
  it("renders correctly", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Column 1</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Row 1 Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByText("Row 1 Data")).toBeInTheDocument();
  });
});
