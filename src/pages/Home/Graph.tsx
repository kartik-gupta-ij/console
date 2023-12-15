import { FC, useEffect, useRef } from 'react';

import * as d3 from 'd3';

import { useQueryResult } from '@/hooks/useQueryResult';


interface DataPoint {
	minute: any;
	count: number;
}
const data: DataPoint[] = [
	{
		minute: '2023-12-15T07:22:00',
		count: 604,
	},
	{
		minute: '2023-12-15T07:23:00',
		count: 596,
	},
	{
		minute: '2023-12-15T07:24:00',
		count: 601,
	},
	{
		minute: '2023-12-15T07:25:00',
		count: 608,
	},
	{
		minute: '2023-12-15T07:26:00',
		count: 599,
	},
	{
		minute: '2023-12-15T07:27:00',
		count: 602,
	},
	{
		minute: '2023-12-15T07:28:00',
		count: 600,
	},
	{
		minute: '2023-12-15T07:29:00',
		count: 602,
	},
	{
		minute: '2023-12-15T07:30:00',
		count: 598,
	},
	{
		minute: '2023-12-15T07:31:00',
		count: 288,
	},
];
type LineChartProp = {
	streamname: string;
};

const LineChart: FC<LineChartProp> = ({ streamname }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const { data: queryResult, getQueryData } = useQueryResult();
	useEffect(() => {
		let LogQuery = {
			startTime: '1m' as any,
			endTime: 'now' as any,
			streamName: streamname,
			limit: 1000,
			pageOffset: 0,
		};
		getQueryData(
			LogQuery,
			`SELECT DATE_TRUNC('minute', p_timestamp) AS minute, COUNT(*) AS count FROM ${streamname} GROUP BY minute ORDER BY minute ASC;`,
		);
	}, []);

	useEffect(() => {
		if (!svgRef.current) return;
		// if (!queryResult) return;
		if (queryResult) {
			// const data = queryResult.data as DataPoint[];

			const svg = d3.select(svgRef.current);

			// Set up SVG container dimensions
			const margin = { top: 0, right: 20, bottom: 20, left: 0 };
			const width = 200 - margin.left - margin.right;
			const height = 50 - margin.top - margin.bottom;

			// Parse the date
			const parseDate = (d: string): Date => new Date(d);

			// Convert data to appropriate types
			data.forEach((d) => {
				d.minute = parseDate(d.minute);
				d.count = +d.count;
			});

			// Set up scales and axes
			const xScale = d3.scaleTime().range([0, width]);
			const yScale = d3.scaleLinear().range([height, 5]);

			const xAxis = d3.axisBottom<Date>(xScale).tickFormat(d3.timeFormat(':%M'));

			svg.selectAll('*').remove(); // Clear previous content
			svg
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
				.attr('transform', `translate(${margin.left},${margin.top})`);

			// Set the domain of the scales
			xScale.domain(d3.extent(data, (d) => d.minute) as [Date, Date]);
			yScale.domain([0, d3.max(data, (d) => d.count) as number]);

			// Add X Axis
			svg.append('g').attr('transform', `translate(5,${height})`).call(xAxis);

			// Add the line
			svg
				.append('path')
				.datum(data)
				.attr('fill', 'none')
				.attr('stroke', 'steelblue')
				.attr('stroke-width', 1)
				.attr('transform', `translate(5,0)`)
				.attr(
					'd',
					d3
						.line<DataPoint>()
						.x((d) => xScale(d.minute) as number)
						.y((d) => yScale(d.count) as number),
				);
		}
	}, [queryResult]);

	return <svg ref={svgRef}></svg>;
};

export default LineChart;
