import React, { Component } from 'react';
import CardSection from './components/CardSection';
import ChartSection from './components/ChartSection';
import Header from './components/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Id: "bitcoin",
      Data: {}
    }
  }

  fetchData = async () => {
    try {
      let data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${this.state.Id}&x_cg_demo_api_key=CG-aDtck26hhz1f4ZafNontzGaQ`);
      let JsonData = await data.json();
      this.setState({ Id: this.state.Id, Data: JsonData[0] });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  handleSubmit = async (event) => {
    console.log(event.target.value);
    await this.setState({ Id: event.target.value });
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {/* Header */}
        <Header handle_Submit={this.handleSubmit} />

        {/* Main Centered Container */}
        <div className="container my-2">
          
          {/* CardSection first */}
          <div >
            <div >
              <CardSection 
                coinName={this.state.Data.name}
                currentPrice={this.state.Data.current_price}
                mCap24={this.state.Data.market_cap_change_percentage_24h}
                ath={this.state.Data.ath}
                atl={this.state.Data.atl}
                sentiment={"N/A"} 
                high24={this.state.Data.high_24h}
                low24={this.state.Data.low_24h}
              />
            </div>
          </div>

          {/* Then ChartSection */}
          <div >
            <div>
              <ChartSection 
                Id={this.state.Id}
                priceChange24={this.state.Data.price_change_24h}
                MarketCap={this.state.Data.market_cap}
                TotVol={this.state.Data.total_volume}
                Circulating={this.state.Data.circulating_supply}
                twitterF={"N/A"} 
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
