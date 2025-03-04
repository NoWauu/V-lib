
export interface StationData {
	station_id: number;
	numBikesAvailable: number;
	"num_bikes_available_types": {
		"mechanical": number;
		"ebike": number;
	},
	numDocksAvailable: number;
	is_returning: boolean;
	is_renting: boolean;
	last_reported: number;
	stationCode: number;
}