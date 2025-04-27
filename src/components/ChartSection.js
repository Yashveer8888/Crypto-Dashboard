import React, { Component } from 'react';
import Chart from 'react-apexcharts';

export class ChartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 365,
      Price: {
        options: this.getChartOptions('Market Price (USD)', '#fcdf03'),
        series: [{ name: 'Market Price', data: [] }],
      },
      Market_Cap: {
        options: this.getChartOptions('Market Cap (USD)', '#ff69f5'),
        series: [{ name: 'Market Cap', data: [] }],
      },
      Tot_Vol: {
        options: this.getChartOptions('Market Volume', '#00ffea'),
        series: [{ name: 'Market Volume', data: [] }],
      },
    };
    this.interval = null;
  }

  getChartOptions = (title, color) => ({
    chart: { id: 'area-datetime' },
    grid: { show: false },
    title: {
      text: title,
      style: { fontSize: '14px', fontWeight: 'bold', color },
    },
    stroke: { curve: 'smooth' },
    xaxis: { type: 'datetime' },
    dataLabels: { enabled: false },
    yaxis: { show: false },
    colors: [color],
    tooltip: {
      y: { formatter: (value) => value?.toFixed(2) },
      theme: 'dark',
    },
  });

  fetchData = async () => {
    const { Id } = this.props;
    const { selection } = this.state;
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=usd&days=${selection}`
      );
      const data = await response.json();
      this.setState({
        Price: { ...this.state.Price, series: [{ name: 'Market Price', data: data.prices }] },
        Market_Cap: { ...this.state.Market_Cap, series: [{ name: 'Market Cap', data: data.market_caps }] },
        Tot_Vol: { ...this.state.Tot_Vol, series: [{ name: 'Market Volume', data: data.total_volumes }] },
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(this.fetchData, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.Id !== this.props.Id || prevState.selection !== this.state.selection) {
      this.fetchData();
    }
  }

  updateSelection = (days) => {
    this.setState({ selection: days });
  };

  renderToolbar = () => {
    const buttons = [
      { label: '1D', value: 1 },
      { label: '1W', value: 7 },
      { label: '1M', value: 30 },
      { label: '6M', value: 182 },
      { label: '1Y', value: 365 },
    ];

    return (
      <div className="toolbar">
        {buttons.map((btn, idx) => (
          <button key={idx} onClick={() => this.updateSelection(btn.value)}>
            {btn.label}
          </button>
        ))}
      </div>
    );
  };

  renderStats = () => {
    const { MarketCap, priceChange24, TotVol, Circulating, twitterF } = this.props;
    const stats = [
      { label: 'Market Cap', value: `$${MarketCap}` },
      { label: 'Price Change 24hrs', value: `$${priceChange24}` },
      { label: 'Total Volume', value: `$${TotVol}` },
      { label: 'Circulating Supply', value: Circulating },
      { label: 'Twitter Followers', value: twitterF },
    ];

    return (
      <div className="marketStats">
        {stats.map((stat, idx) => (
          <div className="statItem" key={idx}>
            <h6 className="statTitle">{stat.label}</h6>
            <p className="statValue">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { Price, Market_Cap, Tot_Vol } = this.state;

    return (
      <>
        <div className="chartSection">
          <div className="mainContent">
            <div className="priceChart">
              {this.renderToolbar()}
              <Chart options={Price.options} series={Price.series} type="area" height="400" width="100%" />
            </div>

            <div className="statsAndCharts">
              {this.renderStats()}

              <div className="smallCharts">
                <Chart options={Market_Cap.options} series={Market_Cap.series} type="line" height="150" width="100%" />
                <Chart options={Tot_Vol.options} series={Tot_Vol.series} type="line" height="150" width="100%" />
              </div>
            </div>
          </div>
        </div>

        {/* Inline Styles */}
        <style>{`
          .chartSection {
            width: 100%;
            min-height: 100vh;
            background: #121212;
            padding: 20px;
            box-sizing: border-box;
            flex-direction: column;
          }

          .mainContent {
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            align-items: flex-start;
          }

          .priceChart {
            background: #1e1e2f;
            padding: 20px;
            border-radius: 10px;
            margin: 20px;
            flex: 1 1 600px;
            max-width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            max-height: 50%;
          }

          .toolbar {
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .toolbar button {
            background-color: #333;
            color: #fff;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .toolbar button:hover {
            background-color: #555;
          }

          .statsAndCharts {
            display: flex;
            gap: 10px;
          }

          .marketStats, .smallCharts {
            background: #1e1e2f;
            padding: 20px;
            margin: 10px;
            border-radius: 10px;
            gap: 30px;
            width: 100%;
            flex-direction: column;
          }

          .statTitle {
            font-size: 0.9rem;
            color: #ccc;
            margin-bottom: 1px;
            flex-direction: column;
          }

          .statValue {
            font-size: 1rem;
            font-weight: bold;
            color: white;
            flex-direction: column;
          }
        `}</style>
      </>
    );
  }
}

export default ChartSection;
