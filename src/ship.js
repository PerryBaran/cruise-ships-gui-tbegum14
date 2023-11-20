(function () {
	class Ship {
		constructor(itinerary) {
			this.itinerary = itinerary;
			this.currentPort = itinerary.ports[0];
			this.previousPort = null;
			this.currentPort.addShip(this);
		}

		setSail() {
			const itinerary = this.itinerary;
			const currentPortInd = itinerary.ports.indexOf(this.currentPort);
			if (currentPortInd === this.itinerary.ports.length - 1) {
				throw new Error("You have reached the end of the itinerary");
			}
			this.currentPort.removeShip(this);
			this.previousPort = this.currentPort;
			this.currentPort = null;
		}

		dock() {
			const newInd = this.itinerary.ports.indexOf(this.previousPort) + 1;
			this.currentPort = this.itinerary.ports[newInd];
			this.currentPort.addShip(this);
		}
	}
	if (typeof module !== "undefined" && module.exports) {
		module.exports = Ship;
	} else {
		window.Ship = Ship;
	}
})();
