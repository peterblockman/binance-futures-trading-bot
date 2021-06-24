import { CandleChartInterval } from 'binance-api-node';
import { RSI } from './strategies/buy_sell';
import calculateTPSL from './strategies/tpsl/basic';
import { supertrend } from './strategies/trend';

// ============================ CONST =================================== //

// The bot wii trade with the binance :
export const BINANCE_MODE: BinanceMode = 'futures';

// ====================================================================== //

export const tradeConfigs: TradeConfig[] = [
  {
    asset: 'BTC',
    base: 'USDT',
    allocation: 0.01,
    leverage: 10,
    interval: CandleChartInterval.ONE_MINUTE,
    lossTolerance: 0.1,
    buyStrategy: (candles: ChartCandle[]) =>
      RSI.isBuySignal(candles, {
        rsiOverbought: 90,
        rsiOversold: 10,
        rsiPeriod: 2,
      }),
    sellStrategy: (candles: ChartCandle[]) =>
      RSI.isSellSignal(candles, {
        rsiOverbought: 90,
        rsiOversold: 10,
        rsiPeriod: 2,
      }),
    tpslStrategy: calculateTPSL,
    checkTrend: supertrend.isOverTrendLine,
  },
];
