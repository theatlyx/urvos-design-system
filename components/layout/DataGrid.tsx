"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ChevronUp, ChevronDown, ChevronsUpDown, Check } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/Table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../navigation/Pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/Select";
import { Input } from "../ui/Form";

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataGridProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  className?: string;
}

export function DataGrid<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 10,
  selectable = false,
  onRowClick,
  onSelectionChange,
  className,
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [filterQuery, setFilterQuery] = useState("");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      const next = new Set(selectedIds);
      paginatedData.forEach((row) => next.delete(row.id));
      setSelectedIds(next);
      onSelectionChange?.(Array.from(next));
    } else {
      const next = new Set(selectedIds);
      paginatedData.forEach((row) => next.add(row.id));
      setSelectedIds(next);
      onSelectionChange?.(Array.from(next));
    }
  };

  const toggleSelectRow = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
    onSelectionChange?.(Array.from(next));
  };

  // Filter
  const filteredData = data.filter((row) =>
    columns.some((col) => {
      const val = (row as any)[col.key];
      return val ? String(val).toLowerCase().includes(filterQuery.toLowerCase()) : false;
    })
  );

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = (a as any)[sortKey];
    const bVal = (b as any)[sortKey];
    if (aVal === bVal) return 0;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return sortDir === "asc" ? -1 : 1;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={clsx("space-y-4 w-full", className)}>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter data..."
          value={filterQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-xs"
        />
        <div className="text-xs text-urvos-text-subtle">
          {selectedIds.size > 0 && <span>{selectedIds.size} row(s) selected</span>}
        </div>
      </div>

      <div className="rounded-md border border-urvos-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-[40px] px-2 text-center">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length}
                    onChange={toggleSelectAll}
                    className="checkbox"
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  style={{ width: col.width }}
                  className={clsx(col.sortable && "cursor-pointer select-none")}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-urvos-text-subtle">
                        {sortKey === col.key ? (
                          sortDir === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )
                        ) : (
                          <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)} className="h-24 text-center text-urvos-text-subtle">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <TableRow
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={clsx(
                      onRowClick && "cursor-pointer",
                      isSelected && "bg-urvos-primary/5"
                    )}
                  >
                    {selectable && (
                      <TableCell className="px-2 text-center" onClick={(e: React.MouseEvent) => toggleSelectRow(row.id, e)}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="checkbox"
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.accessor ? col.accessor(row) : (row as any)[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-sm text-urvos-text-subtle">
          <span>Rows per page:</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(val: string) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-urvos-text-subtle">
            Page {currentPage} of {totalPages} ({sortedData.length} items)
          </span>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={clsx(currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={clsx(currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
