import { LogStreamStat } from '@/@types/parseable/api/stream';
import { getLogStreamStats } from '@/api/logStream';
import { StatusCodes } from 'http-status-codes';
import useMountedState from './useMountedState';

export const useGetLogStreamStat = () => {
	const [data, setData] = useMountedState<LogStreamStat | null>(null);
	const [error, setError] = useMountedState<string | null>(null);
	const [loading, setLoading] = useMountedState<boolean>(false);

	const getLogStat = async (streamName: string) => {
		try {
			setLoading(true);
			setError(null);
			const res = await getLogStreamStats(streamName);

			switch (res.status) {
				case StatusCodes.OK: {
					const streams = res.data;

					setData(streams);
					break;
				}
				default: {
					setError('Failed to get ALert');
				}
			}
		} catch {
			setError('Failed to get ALert');
		} finally {
			setLoading(false);
		}
	};

	const resetData = () => {
		setData(null);
	};

	return { data, error, loading, getLogStat, resetData };
};
