import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "./Table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "../navigation/Pagination";
import { Button } from "./Button";
import { Input } from "./Form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./Select";
import { ChevronDown, Filter } from "lucide-react";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithPaginationAndFilters: StoryObj = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Search patients..." className="w-[250px]" />
          <Button variant="secondary" size="icon">
            <Filter className="h-4 w-4 text-urvos-text-subtle" />
          </Button>
        </div>
        <Button variant="secondary" className="gap-2">
          Sort by: Recent <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </div>
      
      <div className="rounded-md border border-urvos-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Last Visit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">PT-1002</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Active</TableCell>
              <TableCell className="text-right">Oct 24, 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">PT-1003</TableCell>
              <TableCell>Robert Johnson</TableCell>
              <TableCell>Discharged</TableCell>
              <TableCell className="text-right">Sep 12, 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">PT-1004</TableCell>
              <TableCell>Emily Davis</TableCell>
              <TableCell>Active</TableCell>
              <TableCell className="text-right">Nov 01, 2023</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-sm text-urvos-text-subtle">
          <span>Rows per page:</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="ml-2">Showing 1-10 of 100 records</span>
        </div>

        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
};
