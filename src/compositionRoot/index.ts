import composeMallSmallParkingLot from './composeMallSmallParkingLot';
import composeMallParkingLot from './composeMallParkingLot'
import composeStadiumParkingLot from './composeStadiumParkingLot';

export default () => ({
    mallSmallParkingLot: composeMallSmallParkingLot(),
    mallParkingLot: composeMallParkingLot(),
    stadiumParkingLot: composeStadiumParkingLot()
})