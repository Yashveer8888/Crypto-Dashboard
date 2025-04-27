import React, { Component } from 'react';

const styles = {
    container: {
        fontFamily: 'NHaasGroteskDSPro-65Md',
        marginTop: '3px',
    },
    title: {
        fontFamily: 'NHaasGroteskDSPro-65Md',
        marginTop: '3px',
        marginBottom: '0px',
        fontSize: '2rem',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    cardSection: {
        marginTop: '2px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: "11rem",
        backgroundColor: "rgb(43, 43, 43)",
        margin: '1rem',
        textAlign: 'center',
    },
    cardBody: {
        padding: '1rem',
    },
    cardTitle: {
        fontFamily: 'NHaasGroteskDSPro-65Md',
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: '1.25rem',
    },
    marketCapText: {
        color: "#fcdf03",
    },
    athText: {
        color: "#fcdf03",
    },
    atlText: {
        color: "#fcdf03",
    },
    sentimentText: {
        color: "#fcdf03",
    },
    high24Text: {
        color: "rgb(51, 255, 0)",
    },
    low24Text: {
        color: 'rgb(255, 32, 32)',
    },
    currentPriceTitle: {
        textAlign: 'center',
        fontFamily: 'NHaasGroteskDSPro-65Md',
        marginTop: '1%',
    },
    currentPrice: {
        fontFamily: 'NHaasGroteskDSPro-65Md',
        fontSize: '90px',
        fontWeight: '700',
        color: "#fcdf03",
        textAlign: 'center',
    },
};

export class CardSection extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div className="fs-1 fw-bold m-3 text-capitalize" style={styles.title}>
                    {this.props.coinName}
                </div>

                <section className="row m-3 mb-0" style={styles.cardSection}>
                    <div className="card text-white text-center m-3" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <h6 className="card-title" style={styles.cardTitle}>Market Cap 24Hrs</h6>
                            <p className="card-text fw-bold fs-5" style={styles.marketCapText}>
                                {this.props.mCap24} %
                            </p>
                        </div>
                    </div>

                    <div className="card text-white text-center m-3" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <h6 className="card-title" style={styles.cardTitle}>All Time High</h6>
                            <p className="card-text fw-bold fs-5" style={styles.athText}>
                                ${this.props.ath}
                            </p>
                        </div>
                    </div>

                    <div className="card text-white text-center m-3" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <h6 className="card-title" style={styles.cardTitle}>All Time Low</h6>
                            <p className="card-text fw-bold fs-5" style={styles.atlText}>
                                ${this.props.atl}
                            </p>
                        </div>
                    </div>

                    <div className="card text-white text-center m-3" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <h6 className="card-title" style={styles.cardTitle}>Positive Sentiments</h6>
                            <p className="card-text fw-bold fs-5" style={styles.sentimentText}>
                                {this.props.sentiment} %
                            </p>
                        </div>
                    </div>

                    <div className="card text-white text-center m-3" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <h6 className="card-title" style={styles.cardTitle}>High 24Hrs</h6>
                            <p className="card-text fw-bold fs-5" style={styles.high24Text}>
                                ${this.props.high24}
                            </p>
                        </div>
                    </div>

                    <div className="card text-white text-center m-3" style={styles.card}>
                        <div className="card-body" style={styles.cardBody}>
                            <h6 className="card-title" style={styles.cardTitle}>Low 24Hrs</h6>
                            <p className="card-text fw-bold fs-5" style={styles.low24Text}>
                                ${this.props.low24}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="text-white text-center" style={styles.currentPriceTitle}>
                    Current Price
                </div>

                <div style={styles.currentPrice}>
                    ${this.props.currentPrice}
                </div>
            </div>
        );
    }
}

export default CardSection;
