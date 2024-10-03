import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

function BitcoinChart() {
	const [bitcoinPrice, setBitcoinPrice] = useState([]);
	const [bitcoinTime, setBitcoinTime] = useState([]);

	useEffect(() => {
		const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

		ws.onopen = () => {
			console.log('Connected to the server');
		}

		ws.onmessage = (message) => {
			const data = JSON.parse(message.data);
			setBitcoinPrice((prevState) => [...prevState, parseFloat(data.p)]);
			setBitcoinTime((prevState) => {
				const newTime = new Date(data.E).toLocaleTimeString();
				return [...prevState, newTime];
			});
		}

		return () => {
			ws.close();
		}
	}, []);

	const option = {
		title: {
			text: 'Prix du Bitcoin',
			subtext: 'Source: Binance',
			left: 'center'
		},
		tooltip: { // Le tooltip est une boîte qui s'affiche lorsqu'on survole un point
			trigger: 'axis',
			formatter: '{b0}<br />{a0}: {c0} USD'
		},
		xAxis: {
			type: 'category',
			data: bitcoinTime,
		},
		yAxis: {
			type: 'value',
			scale: true, // Pour que l'axe des ordonnées s'adapte automatiquement à la valeur minimale et maximale
		},
		series: [{
			data: bitcoinPrice,
			type: 'line',// line | bar | pie
			smooth: true, // Pour que la courbe soit lissée
		}],
	}


	return (
		<div className="BitcoinChart">
			<ReactECharts option={option} style={{ height: '500px', width: '100%' }} />
		</div>
	);
}

export default BitcoinChart;
