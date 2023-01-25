import composeMallSmallParkingLot from './composeMallSmallParkingLot';
import composeMallParkingLot from './composeMallParkingLot'
import composeStadiumParkingLot from './composeStadiumParkingLot';
import composeAirportParkingLot from './composeAirportParkingLot';

export default () => ({
    mallSmallParkingLot: composeMallSmallParkingLot(),
    mallParkingLot: composeMallParkingLot(),
    stadiumParkingLot: composeStadiumParkingLot(),
    airportParkingLot: composeAirportParkingLot()
})