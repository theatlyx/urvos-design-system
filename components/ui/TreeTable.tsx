"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ChevronRight, ChevronDown, Folder, FileText } from "lucide-react";

export interface TreeNode {
  id: string;
  name: string;
  type: string;
  size?: string;
  updatedAt?: string;
  children?: TreeNode[];
}

export interface TreeTableProps {
  data: TreeNode[];
  className?: string;
}

export function TreeTable({ data, className }: TreeTableProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([data[0]?.id]));

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedIds(next);
  };

  const renderNode = (node: TreeNode, depth = 0) => {
    const isExpanded = expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <React.Fragment key={node.id}>
        <tr className="border-b border-urvos-border hover:bg-urvos-surface-muted/50 transition-colors text-sm text-urvos-text">
          <td className="py-2.5 px-4 flex items-center gap-2" style={{ paddingLeft: `${depth * 24 + 16}px` }}>
            {hasChildren ? (
              <button onClick={() => toggleExpand(node.id)} className="p-0.5 hover:bg-urvos-border rounded">
                {isExpanded ? <ChevronDown className="h-4 w-4 opacity-70" /> : <ChevronRight className="h-4 w-4 opacity-70" />}
              </button>
            ) : (
              <span className="w-5" />
            )}
            {hasChildren ? <Folder className="h-4 w-4 text-urvos-primary" /> : <FileText className="h-4 w-4 text-urvos-text-subtle" />}
            <span className="font-medium">{node.name}</span>
          </td>
          <td className="py-2.5 px-4 text-xs text-urvos-text-subtle">{node.type}</td>
          <td className="py-2.5 px-4 text-xs text-urvos-text-subtle">{node.size || "—"}</td>
          <td className="py-2.5 px-4 text-xs text-urvos-text-subtle">{node.updatedAt || "—"}</td>
        </tr>

        {isExpanded && hasChildren && node.children!.map((child) => renderNode(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className={clsx("w-full border border-urvos-border rounded-xl overflow-hidden bg-urvos-surface shadow-sm", className)}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-urvos-surface-muted border-b border-urvos-border text-xs font-semibold text-urvos-text-subtle uppercase">
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Size</th>
            <th className="py-3 px-4">Updated</th>
          </tr>
        </thead>
        <tbody>{data.map((n) => renderNode(n))}</tbody>
      </table>
    </div>
  );
}
