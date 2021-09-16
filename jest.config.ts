import type { Config } from '@jest/types';

const config:Config.InitialOptions = {
	collectCoverage: true,
	collectCoverageFrom: [
		'!src/config/**',
		'!src/mockups/**',
		'!src/models/**',
		'!src/services/index.ts',
	],
}

export default config
