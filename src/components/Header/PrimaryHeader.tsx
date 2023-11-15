import logoInvert from '@/assets/images/brand/logo-invert.svg';
import { HOME_ROUTE } from '@/constants/routes';

import { Box, Button, Image, Tooltip } from '@mantine/core';
import { FC } from 'react';
import classes from './Header.module.css';
type PrimaryHeaderProps = Omit<any, 'children' | 'height' | 'className'>;

const PrimaryHeader: FC<PrimaryHeaderProps> = (props) => {
	const { container, logoContainer, navContainer, imageSty, actionBtn } = classes;

	return (
		// heights[HEADER_HEIGHT] && (p={0} withBorder>
		<header {...props} className={container}>
			<Box className={logoContainer}>
				<a href={HOME_ROUTE}>
					<Image className={imageSty} src={logoInvert} height={32} alt="Parseable Logo" />
				</a>
			</Box>
			<Box className={navContainer}>
				<Box
					display={'flex'}
					style={{
						justifyContent: 'flex-end',
						alignItems: 'center',
						width: '100%',
						paddingLeft: '1rem',
					}}
					pr={'xl'}>
					<Tooltip label="Upgrade to production support" position="bottom">
						<Button
							variant="outline"
							component={'a'}
							href="mailto:sales@parseable.io?subject=Production%20Support%20Query"
							target="_blank"
							className={actionBtn}>
							<Image height={30} fit="fill" src={'/AGPLv3_Logo.svg'} />
						</Button>
					</Tooltip>
				</Box>
			</Box>
		</header>
	);
};

export default PrimaryHeader;
