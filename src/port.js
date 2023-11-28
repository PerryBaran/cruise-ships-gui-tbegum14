(function exportPort() {
	class Port {
		constructor(name) {
			this.name = name;
			this.ships = [];
		}

		addShip(ship) {
			this.ships.push(ship);
		}

		removeShip(ship) {
			const ind = this.ships.indexOf(ship);
			this.ships.splice(ind, 1);
		}
	}
	if (typeof module !== "undefined" && module.exports) {
		module.exports = Port;
	} else {
		window.Port = Port;
	}
})();
