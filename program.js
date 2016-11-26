module.exports = (Bacon) => {
	const bus = new Bacon.Bus();
	setInterval(()=>bus.push(1),1000)
	return bus.take(6)    
};
