import { OrderSide } from 'binance-api-node';
import { decimalFloor } from '../../utils';

export default <TPSLStrategy>({
  price,
  candles,
  tradeConfig,
  pricePrecision,
  side,
}) => {
  const { profitTargets, lossTolerances } = tradeConfig;

  let takeProfits = profitTargets
    ? profitTargets.map(({ deltaPercentage, quantityPercentage }) => {
        if (deltaPercentage)
          return {
            price: decimalFloor(
              side === OrderSide.BUY
                ? price * (1 + deltaPercentage)
                : price * (1 - deltaPercentage),
              pricePrecision
            ),
            quantityPercentage: quantityPercentage,
          };
      })
    : [];

  let stopLosses = lossTolerances
    ? lossTolerances.map(({ deltaPercentage, quantityPercentage }) => {
        if (deltaPercentage)
          return {
            price: decimalFloor(
              side === OrderSide.BUY
                ? price * (1 - deltaPercentage)
                : price * (1 + deltaPercentage),
              pricePrecision
            ),
            quantityPercentage: quantityPercentage,
          };
      })
    : [];

  return { takeProfits, stopLosses };
};
