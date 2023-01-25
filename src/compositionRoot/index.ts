import composeMallSmallParkingLot from './composeMallSmallParkingLot';
import composeMallParkingLot from './composeMallParkingLot'

export default () => ({
    mallSmallParkingLot: composeMallSmallParkingLot(),
    mallParkingLot: composeMallParkingLot()
})