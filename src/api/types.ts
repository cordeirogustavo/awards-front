export type MovieResponse = {
	id?: number;
	year?: number;
	title?: string;
	studios?: string[];
	producers?: string[];
	winner?: boolean;
};

export type PageMovieResponse = {
	totalPages?: number;
	totalElements?: number;
	content?: MovieResponse[];
};

export type MoviesParams = {
	page: number;
	size: number;
	winner?: boolean;
	year?: number;
};

export type YearWithMultipleWinners = {
	year?: number;
	winnerCount?: number;
};

export type YearsWithMultipleWinnersResponse = {
	years?: YearWithMultipleWinners[];
};

export type StudioCountPerWin = {
	name?: string;
	winCount?: number;
};

export type StudiosWithWinCountResponse = {
	studios?: StudioCountPerWin[];
};

export type ProducerWithInterval = {
	producer?: string;
	interval?: number;
	previousWin?: number;
	followingWin?: number;
};

export type MaxMinWinIntervalForProducersResponse = {
	min?: ProducerWithInterval[];
	max?: ProducerWithInterval[];
};
