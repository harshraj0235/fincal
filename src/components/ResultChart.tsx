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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const radius = Math.min(width, height) / 2.2; // Slightly smaller to allow for hover expansion

    const arcGenerator = d3.arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(radius * 0.65)
      .outerRadius(radius)
      .cornerRadius(8); // Rounded corners for premium look

    const hoverArc = d3.arc<d3.PieArcDatum<ChartData>>()
      .innerRadius(radius * 0.63)
      .outerRadius(radius * 1.05)
      .cornerRadius(10);

    const pieGenerator = d3.pie<ChartData>()
      .value(d => d.value)
      .padAngle(0.03) // Gap between slices
      .sort(null);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Add slices with optimized rendering
    const paths = g.selectAll('path')
      .data(pieGenerator(data))
      .enter()
      .append('path')
      .attr('fill', d => d.data.color)
      .attr('stroke', 'none')
      .style('cursor', 'pointer')
      .attr('filter', 'drop-shadow(0px 4px 6px rgba(0,0,0,0.05))');

    // Animations
    paths.transition()
      .duration(1000)
      .ease(d3.easeElasticOut)
      .attrTween('d', function (d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arcGenerator(i(t)) as string;
        };
      });

    // Hover effects
    paths.on('mouseenter', function (_, d) {
      d3.select(this)
        .transition()
        .duration(300)
        .attr('d', hoverArc(d) as string)
        .attr('filter', 'drop-shadow(0px 10px 15px rgba(0,0,0,0.1))');
    }).on('mouseleave', function (_, d) {
      d3.select(this)
        .transition()
        .duration(300)
        .attr('d', arcGenerator(d) as string)
        .attr('filter', 'drop-shadow(0px 4px 6px rgba(0,0,0,0.05))');
    });

    // Add center text
    if (centerText) {
      const centerTextLines = centerText.split('\n');
      const centerTextG = g.append('g')
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none');

      centerTextLines.forEach((line, i) => {
        centerTextG.append('text')
          .attr('y', i * 24 - ((centerTextLines.length - 1) * 12))
          .attr('class', 'select-none')
          .style('font-size', i === 0 ? '20px' : '14px')
          .style('fill', i === 0 ? '#1e293b' : '#64748b')
          .style('font-weight', i === 0 ? '800' : '600')
          .style('font-family', 'Inter, system-ui, sans-serif')
          .text(line);
      });
    }

    // Legend at bottom
    const legend = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height - 20})`)
      .attr('text-anchor', 'middle');

    const legendItems = legend.selectAll('.legend-item')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(${(i - data.length / 2 + 0.5) * 120}, 0)`);

    legendItems.append('circle') // Use circles for legend for softer look
      .attr('r', 5)
      .attr('fill', d => d.color);

    legendItems.append('text')
      .attr('x', 12)
      .attr('y', 5)
      .style('fill', '#475569')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('font-family', 'Inter, system-ui, sans-serif')
      .text(d => d.name);

  }, [data, centerText]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full max-w-[400px] max-h-[400px]"></svg>
    </div>
  );
};