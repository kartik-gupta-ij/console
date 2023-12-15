import useMountedState from '@/hooks/useMountedState';
import { useQueryResult } from '@/hooks/useQueryResult';
import { Button, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { FC, useEffect } from 'react';

const Abc = () => {
	const [array, setArray] = useMountedState<any[]>([]);

	return (
		<div>
			{array.map((valus) => {
				return (
					<div>
						<Text>{valus.minute}</Text>
						<GetoneMinuteCount date={valus.minute} />
					</div>
				);
			})}
			<Button
				onClick={() => {
					setArray([
						{
							minute: '2023-12-15T12:48:00',
							count: 595,
						},
						{
							minute: '2023-12-15T12:49:00',
							count: 602,
						},
						{
							minute: '2023-12-15T12:50:00',
							count: 599,
						},
						{
							minute: '2023-12-15T12:51:00',
							count: 602,
						},
						{
							minute: '2023-12-15T12:52:00',
							count: 599,
						},
						{
							minute: '2023-12-15T12:53:00',
							count: 602,
						},
						{
							minute: '2023-12-15T12:54:00',
							count: 608,
						},
						{
							minute: '2023-12-15T12:55:00',
							count: 595,
						},
						{
							minute: '2023-12-15T12:56:00',
							count: 608,
						},
						{
							minute: '2023-12-15T12:57:00',
							count: 593,
						},
					]);
				}}>
				Click me{' '}
			</Button>
		</div>
	);
};
type LineChartProp = {
	date: string;
};

const GetoneMinuteCount: FC<LineChartProp> = ({ date }) => {
	const { data: queryResult, getQueryData } = useQueryResult();

	useEffect(() => {
		let LogQuery = {
			startTime: dayjs(date).subtract(1, 'm').toDate(),
			endTime: dayjs(date).toDate(),
			streamName: 'qwe',
			limit: 1000,
			pageOffset: 0,
		};
		getQueryData(
			LogQuery,
			`SELECT DATE_TRUNC('minute', p_timestamp) AS minute, COUNT(*) AS count FROM ${'qwe'} GROUP BY minute ORDER BY minute ASC;`,
		);
	}, []);

	return (
		<div>
			{queryResult?.data?.map((valus: any) => {
				return (
					<div>
						<Text>{valus.count}</Text>
					</div>
				);
			})}
		</div>
	);
};

export default Abc;
