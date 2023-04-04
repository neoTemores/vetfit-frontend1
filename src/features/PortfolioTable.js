import React, {useState} from "react";
import '../PortfolioPage.css';

function PortfolioTable(props) {
    const [portfolio, setPortfolio] = useState(props.portfolio);
    
    function handleBuy(symbol) {
        const sharePrice = getSharePrice(symbol);
        const numberOfShares = prompt("How many shares of ${symbol} would you like to buy?")
    // TODO: add code to update portfolio when you buy a share
    }

    function handleSell(symbol) {
        const sharePrice = getSharePrice(symbol);
        const numberOfShares = prompt("How many shares of ${symbol} would you like to sell?")
    // TODO: add code to update portfolio when you sell a share
    }

    function getSharePrice(symbol) {
        return 150.00; //for testing
    }

    return (
        <table>
            <tr>
                <th>Symbol</th>
                <th>Share Price</th>
                <th>#Shares</th>
                <th>$ Invested</th>
                <th>Investment Value</th>
                <th>Action</th>
            </tr>
        <tbody>
            {portfolio.map(stock =>
                <tr key={stock.symbol}>
                    <td className="symbol-name">{stock.symbol}</td>
                    <td>${getSharePrice(stock.symbol)}</td>
                    <td>{stock.numberOfShares}</td>
                    <td>${stock.amountInvested}</td>
                    <td>${getSharePrice(stock.symbol) * stock.numberOfShares}</td>
                    <td>
                        <button onClick={() => handleBuy=(stock.symbol)}>Buy</button>
                        <button onClick={() => handleSell=(stock.symbol)}>Sell</button>
                    </td>
                </tr>
                )}
        </tbody>
        </table>
    );
}

export default PortfolioTable;