import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ResultChartProps {
  data: ChartData[];
  centerText?: string;
}

export const ResultChart: React.FC<ResultChartProps> = ({ data, centerText }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const radius = Math.min(width, height) / 2;
    
    const arcGenerator = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);
    
    const pieGenerator = d3.pie<ChartData>()
      .value(d => d.value)
      .sort(null);
    
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    // Add slices with optimized rendering
    const paths = g.selectAll('path')
      .data(pieGenerator(data))
      .enter()
      .append('path')
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('opacity', 0.8);
      
    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      paths.transition()
        .duration(600)
        .attrTween('d', function(d: any) {
          const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function(t: number) {
            return arcGenerator(i(t)) as string;
          };
        });
    });
    
    // Add center text
    if (centerText) {
      const centerTextLines = centerText.split('\n');
      const centerTextG = g.append('g')
        .attr('text-anchor', 'middle');
      
      centerTextLines.forEach((line, i) => {
        centerTextG.append('text')
          .attr('y', i * 20 - ((centerTextLines.length - 1) * 10))
          .attr('class', 'text-neutral-800 font-semibold')
          .style('font-size', i === 0 ? '16px' : '14px')
          .style('fill', i === 0 ? '#1e40af' : '#64748b')
          .style('font-weight', i === 0 ? 'bold' : 'normal')
          .text(line);
      });
    }
    
    // Add legend with optimized rendering
    const legend = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height - 10})`)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs');
    
    // Use a more efficient approach for legend rendering
    const legendItems = legend.selectAll('.legend-item')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(${(i - data.length / 2 + 0.5) * 80}, 0)`);
    
    legendItems.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', d => d.color);
    
    legendItems.append('text')
      .attr('x', 18)
      .attr('y', 10)
      .style('fill', '#64748b')
      .text(d => d.name);
    
  }, [data, centerText]);
  
  return (
    <svg ref={svgRef} width="100%" height="100%"></svg>
  );
};