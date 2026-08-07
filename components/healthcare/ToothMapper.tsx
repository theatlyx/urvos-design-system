"use client";

import React, { useState, useEffect, useRef } from 'react';
import { RawDentalChartSVG } from './RawDentalChartSVG';

export const ToothMapper = () => {
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [toothNumber, setToothNumber] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  const handleGroupClick = (id: string) => {
    setActiveGroupId(id);
    if (mapping[id]) {
      setToothNumber(mapping[id]);
    } else {
      setToothNumber("");
    }
  };

  const handleSave = () => {
    if (activeGroupId && toothNumber) {
      setMapping(prev => ({ ...prev, [activeGroupId]: toothNumber }));
      setActiveGroupId(null);
      setToothNumber("");
    }
  };

  const autoMap = () => {
    if (!svgRef.current) return;
    
    // 1. Get all groups that represent teeth parts
    const groups = Array.from(svgRef.current.querySelectorAll('g[id^="Group-"]'));
    
    // 2. Get bounding boxes
    const boxes = groups.map(g => {
      const rect = (g as SVGGElement).getBoundingClientRect();
      return {
        id: g.id,
        cx: rect.x + rect.width / 2,
        cy: rect.y + rect.height / 2,
      };
    }).filter(b => b.cx !== 0 && b.cy !== 0);

    if (boxes.length === 0) {
        console.error("No groups found!");
        return;
    }

    // 3. Separate into Upper and Lower jaws based on average Y
    const avgY = boxes.reduce((sum, b) => sum + b.cy, 0) / boxes.length;
    const upperJaw = boxes.filter(b => b.cy < avgY);
    const lowerJaw = boxes.filter(b => b.cy >= avgY);

    // 4. Helper to cluster by X coordinate
    const clusterByX = (items: typeof boxes) => {
      const sorted = [...items].sort((a, b) => a.cx - b.cx);
      const clusters: (typeof boxes)[] = [];
      let currentCluster: typeof boxes = [];
      
      sorted.forEach((item, i) => {
        if (currentCluster.length === 0) {
          currentCluster.push(item);
        } else {
          const lastItem = currentCluster[currentCluster.length - 1];
          if (Math.abs(item.cx - lastItem.cx) > 25) { // increased threshold
            clusters.push(currentCluster);
            currentCluster = [item];
          } else {
            currentCluster.push(item);
          }
        }
      });
      if (currentCluster.length > 0) clusters.push(currentCluster);
      return clusters;
    };

    const upperClusters = clusterByX(upperJaw);
    const lowerClusters = clusterByX(lowerJaw);

    const upperNumbers = ["18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28"];
    const lowerNumbers = ["48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"];

    const newMapping: Record<string, string> = {};

    upperClusters.forEach((cluster, i) => {
      const toothNum = upperNumbers[i] || `U${i}`;
      cluster.forEach(b => newMapping[b.id] = toothNum);
    });

    lowerClusters.forEach((cluster, i) => {
      const toothNum = lowerNumbers[i] || `L${i}`;
      cluster.forEach(b => newMapping[b.id] = toothNum);
    });

    setMapping(newMapping);
  };

  // Generate CSS to highlight teeth
  const dynamicCss = `
    /* Default teeth color */
    g[id^="Group-"] { 
        fill: #e5e7eb; 
        cursor: pointer;
        transition: fill 0.2s;
    }
    g[id^="Group-"]:hover {
        fill: #d1d5db;
    }
    /* Mapped teeth */
    ${Object.keys(mapping).map(id => `g[id="${id}"] { fill: #10b981 !important; }`).join('\n')}
    /* Active tooth */
    ${activeGroupId ? `g[id="${activeGroupId}"] { fill: #3b82f6 !important; }` : ''}
  `;

  return (
    <div className="flex gap-4 w-full h-full p-4 bg-urvos-surface text-urvos-text">
      <style>{dynamicCss}</style>
      <div ref={svgRef} className="flex-1 border border-urvos-border p-4 bg-white overflow-auto relative rounded-2xl min-h-[600px]">
        <RawDentalChartSVG 
          onClick={handleGroupClick}
        />
      </div>
      <div className="w-80 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Tooth Mapper</h2>
        <p className="text-sm text-urvos-text-muted">Click a part of the chart to assign it a tooth number.</p>
        
        <button 
          onClick={autoMap}
          style={{ backgroundColor: '#7c3aed', color: '#ffffff' }}
          className="w-full px-4 py-2 rounded-lg font-medium shadow-sm transition-all hover:opacity-90"
        >
          ✨ Auto-Map Teeth using AI
        </button>

        {activeGroupId ? (
          <div className="p-4 bg-urvos-surface-sunken rounded-xl flex flex-col gap-2">
            <div className="font-medium text-sm">Selected Group: <span className="font-mono text-xs">{activeGroupId}</span></div>
            <input 
              value={toothNumber}
              onChange={(e) => setToothNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="e.g. 18, 17, 44..."
              className="px-3 py-2 border border-urvos-border rounded-lg bg-white"
            />
            <button 
              onClick={handleSave}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Assign Tooth
            </button>
          </div>
        ) : (
          <div className="p-4 bg-urvos-surface-sunken rounded-xl text-sm text-urvos-text-muted">
            No group selected. Click the chart.
          </div>
        )}

        <div className="mt-8 flex flex-col gap-2">
          <h3 className="font-semibold text-sm">Current Mapping JSON:</h3>
          <p className="text-xs text-urvos-text-muted">Copy this JSON and paste it to the chat once you've mapped everything.</p>
          <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded-xl overflow-auto h-[400px]">
            {JSON.stringify(mapping, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
