// using CCXT;

// Dictionary<string, Exchange> exchanges = new Dictionary<string, Exchange>();
// exchanges.Add("Binance", new Binance());
// exchanges.Add("Bitfinex", new Bitfinex());
// exchanges.Add("Kraken", new Kraken());

// foreach (KeyValuePair<string, Exchange> entry in exchanges)
// {
//     entry.Value.SetCredentials("API_KEY", "SECRET");
//     entry.Value.LoadMarkets();
// }

// string symbol = "BTC/USDT";

// //SET THE TARGET PROFIT PERCENTAGE
// decimal targetProfitPercentage = 0.2m;

// //GET THE INITIAL BALANCE
// decimal initialBalance = exchanges["Binance"].FetchBalance().Total;


// //INITIALIZE A VARIABLE TO STORE CURRENT PROFIT
// decimal currentProfit = 0;

// while (currentProfit / initialBalance < targetProfitPercentage)
// {

// //INITIALIZE VARIABLES TO STORE THE BEST BID AND ASK PRICES
// decimal bestBid = 0;
// decimal bestAsk = decimal.MaxValue;

// //INITIALIZE A VARIABLE TO STORE THE BEST EXCHANGE
// Exchange bestExchange = null;

// foreach (KeyValuePair<string, Exchange> entry in exchanges)
// {
//     Ticker ticker = entry.Value.FetchTicker(symbol);
//     Console.WriteLine(entry.Key + "Bid: " + ticker.Bid + "Ask: " + ticker.Ask);

//     //CHECK IF THE CURRENT EXCHANGE HAS THE BEST BID AND ASK PRICES
//     if (ticker.Bid > bestBid)
//     {
//         bestBid = ticker.Bid;
//     }
//     if (ticker.Ask < bestAsk)
//     {
//         bestAsk = ticker.Ask;
//         bestExchange = entry.Value;
//     }
// }

// //PRINT THE BEST BID AND ASK PRICES
// Console.WriteLine("Best Bid: " + bestBid);
// Console.WriteLine("Best Ask: " + bestAsk);

// //PLACE A BUY ORDER ON THE BEST EXCHANGE
// decimal buyAmount = 0.01m;
// Order buyOrder = bestExchange.CreateOrder(symbol, "limit", "buy", buyAmount, bestAsk);
// Console.WriteLine("Buy order placed on " + bestExchange.Name + ":" + buyOrder.ToString());

// //PLACE A SELL ORDER ON THE BEST EXCHANGE
// decimal sellAmount = buyAmount;
// decimal sellPrice = bestBid * 1.01m;
// Order sellOrder = bestExchange.CreateOrder(symbol, "limit", "sell", sellAmount, sellPrice);
// Console.WriteLine("Sell order placed on " + bestExchange.Name + ":" + sellOrder.ToString());

// //UPDATE CURRENT PROFIT
// currentProfit = exchanges["Binance"].FetchBalance().Total - initialBalance;
// }


// const ccxt = require ('ccxt')
// const binance = new ccxt.binance({
//     'rateLimit': 2000,
//     'enableRateLimit': true,
// })
// const bitfinex = new ccxt.bitfinex({
//     'rateLimit': 2000,
//     'enableRateLimit': true,
// })
// const kraken = new ccxt.kraken({
//     'rateLimit': 2000,
//     'enableRateLimit': true,
// })

// async function trade() {
//     // Get the initial balance of the account
//     const initialBalance = await binance.fetchBalance();
//     const initialBTC = initialBalance.BTC.total;
//     console.log(`Initial BTC balance: ${initialBTC}`);

//     // Set the target profit percentage
//     const targetProfitPercentage = 0.2;

//     while (true) {
//         try {
//             // Fetch the ticker for the BTC/USDT pair on all three exchanges
//             const binanceTicker = await binance.fetchTicker('BTC/USDT')
//             const bitfinexTicker = await bitfinex.fetchTicker('BTC/USDT')
//             const krakenTicker = await kraken.fetchTicker('BTC/USDT')

//             // Check the lowest ask price among the three exchanges
//             const lowestAsk = Math.min(binanceTicker.ask, bitfinexTicker.ask, krakenTicker.ask)

//             // Check the highest bid price among the three exchanges
//             const highestBid = Math.max(binanceTicker.bid, bitfinexTicker.bid, krakenTicker.bid)

//             // If the spread between the lowest ask and the highest bid is greater than a certain threshold
//             if (highestBid - lowestAsk > 100) {
//                 // Place a limit buy order on the exchange with the lowest ask price
//                 if (binanceTicker.ask === lowestAsk) {
//                     const binanceBuyOrder = await binance.createOrder('BTC/USDT', 'limit', 'buy', 0.01, lowestAsk)
//                     console.log(`Binance buy order: ${binanceBuyOrder}`)
//                 } else if (bitfinexTicker.ask === lowestAsk) {
//                     const bitfinexBuyOrder = await bitfinex.createOrder('BTC/USDT', 'limit', 'buy', 0.01, lowestAsk)
//                     console.log(`Bitfinex buy order: ${bitfinexBuyOrder}`)
//                 } else if (krakenTicker.ask === lowestAsk) {
//                     const krakenBuyOrder = await kraken.createOrder('BTC/USDT', 'limit', 'buy', 0.01, lowestAsk)
//                     console.log(`Kraken buy order: ${krakenBuyOrder}`)
//                 }

//                 // Place a limit sell order on the exchange with the highest bid price
//                 if (binanceTicker.bid === highestBid) {
//                     const binanceSellOrder = await binance.createOrder('BTC/USDT', 'limit', 'sell', 0.01, highestBid)
//                     console.log(`Binance sell order: ${binanceSellOrder}`)
//                 } else if (bitfinexTicker.bid === highestBid) {
//                     const bitfinexSellOrder = await bitfinex.createOrder('BTC/USDT', 'limit', 'sell', 0.01, highestBid)
//                     console.log(`Bitfinex sell order: ${bitfinexSellOrder}`)
//                 } else if (krakenTicker.bid === highestBid) {
//                  const KrakenSellOrder = await kraken.createOrder('BTC/USDT', 'limit', 'sell', 0.01, highestBid)
//                 console.log(`Kraken sell order: ${krakenSellOrder}`)
//                 }
//             }
//         }
//         catch (Exception )
//         {
//           Console.ForegroundColor = ConsoleColor.Red;
//           Console.WriteLine(e.Message);
//         }
//     }
// }
