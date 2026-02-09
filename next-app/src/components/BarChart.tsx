import React, { useEffect, useRef } from 'react';
import { getD3 } from '../lib/clientOnlyLibs';

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color: string | ((d: any) => string);
  xLabel?: string;
  yLabel?: string;
  formatY?: (value: number) => string;
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  xKey, 
  yKey, 
  color,
  xLabel,
  yLabel,
  formatY = (value) => value.toString()
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    let cancelled = false;
    getD3().then((d3) => {
      if (cancelled || !svgRef.current) return;
      const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleBand()
      .domain(data.map(d => d[xKey]))
      .range([0, innerWidth])
      .padding(0.3);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yKey]) as number * 1.1])
      .range([innerHeight, 0]);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Add x-axis with optimized rendering
    const xAxis = g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));
    
    xAxis.selectAll('text')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#64748b');
    
    // Add x-axis label
    if (xLabel) {
      g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + margin.bottom - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', '#64748b')
        .text(xLabel);
    }
    
    // Add y-axis with optimized rendering
    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(d => {
          const value = d as number;
          if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
          } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}K`;
          }
          return value.toString();
        })
      );
    
    yAxis.selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#64748b');
    
    // Add y-axis label
    if (yLabel) {
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -innerHeight / 2)
        .attr('y', -margin.left + 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', '#64748b')
        .text(yLabel);
    }
    
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      // Add bars with optimized animation
      const bars = g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d[xKey]) as number)
        .attr('y', innerHeight)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('fill', typeof color === 'function' ? (d => color(d)) : color)
        .attr('rx', 4)
        .attr('opacity', 0.8);
      
      bars.transition()
        .duration(600)
        .attr('y', d => yScale(d[yKey]))
        .attr('height', d => innerHeight - yScale(d[yKey]));
      
      // Add value labels with optimized rendering
      const labels = g.selectAll('.value-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('x', d => (xScale(d[xKey]) as number) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d[yKey]) - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '11px')
        .style('fill', '#64748b')
        .style('opacity', 0)
        .text(d => {
          const value = d[yKey];
          if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
          } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}K`;
          }
          return value.toString();
        });
      
      labels.transition()
        .duration(600)
        .style('opacity', 1);
    });
    });
    return () => { cancelled = true; };
  }, [data, xKey, yKey, color, xLabel, yLabel, formatY]);
  
  return (
    <svg ref={svgRef} width="100%" height="100%" className="will-change-transform">
      <defs>
        <clipPath id="chart-area">
          <rect x="0" y="0" width="100%" height="100%"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};