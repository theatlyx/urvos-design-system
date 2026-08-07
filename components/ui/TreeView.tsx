"use client";
import { type ReactNode, useState } from "react";
import { ChevronRight, Folder, FolderOpen, FileText } from "lucide-react";
import { clsx } from "clsx";

/* ── Types ───────────────────────────────────────────────────── */
export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps {
  nodes: TreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** Initially expanded node ids */
  defaultExpanded?: string[];
  className?: string;
}

/* ── Recursive node ──────────────────────────────────────────── */
function TreeNodeRow({
  node,
  selectedId,
  onSelect,
  expanded,
  onToggle,
  depth = 0,
}: {
  node: TreeNode;
  selectedId?: string;
  onSelect?: (id: string) => void;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  depth?: number;
}) {
  const isLeaf     = !node.children || node.children.length === 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  const DefaultIcon = isLeaf
    ? FileText
    : isExpanded
    ? FolderOpen
    : Folder;

  return (
    <div>
      <div
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={!isLeaf ? isExpanded : undefined}
        className={clsx("tree__node", isSelected && "tree__node--selected")}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={() => {
          onSelect?.(node.id);
          if (!isLeaf) onToggle(node.id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.(node.id);
            if (!isLeaf) onToggle(node.id);
          }
        }}
        tabIndex={0}
      >
        {/* Expand/collapse chevron */}
        <ChevronRight
          className={clsx(
            "tree__expand-icon",
            isLeaf      && "tree__expand-icon--leaf",
            isExpanded  && "tree__expand-icon--open"
          )}
        />

        {/* Node icon */}
        <span className="tree__node-icon" style={{ color: isSelected ? "var(--brand-solid)" : "var(--text-3)" }}>
          {node.icon ?? <DefaultIcon style={{ width: 16, height: 16 }} />}
        </span>

        {node.label}
      </div>

      {/* Children */}
      {!isLeaf && isExpanded && (
        <div className="tree__children" role="group">
          {node.children!.map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              expanded={expanded}
              onToggle={onToggle}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Root ────────────────────────────────────────────────────── */
export function TreeView({
  nodes,
  selectedId,
  onSelect,
  defaultExpanded = [],
  className,
}: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div role="tree" className={clsx("tree", className)}>
      {nodes.map((node) => (
        <TreeNodeRow
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
          expanded={expanded}
          onToggle={toggle}
        />
      ))}
    </div>
  );
}
