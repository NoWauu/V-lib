import StationDetails from "@/components/account/favorites/StationDetails";
import IFavoriteStation from "@/types/IFavoriteStation";

export default function FavoriteStations({
  stationsList,
}: {
  stationsList: IFavoriteStation[];
}) {
  return (
    <>
      {stationsList.length ? (
        <div className="p-4">
          <h2 className="text-lg font-semibold p-4">Stations favorites</h2>
          <div className="flex flex-col items-center justify-center gap-4">
            {stationsList.map((station, index) => <StationDetails stationDetails={station} key={index}/>)}
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold p-4">Stations favorites</h2>
          <p className="px-4">Aucune station favorite pour le moment</p>
        </>
      )}
    </>
  );
}
