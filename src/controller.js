;(function () {
    function Controller(ship) {
        this.initialiseSea()
        this.ship = ship

        const sailButton = document.querySelector('#sailbutton')
        sailButton.addEventListener('click', () => {
            sailButton.disabled = true
            this.setSail()
        })
    }

    Controller.prototype.initialiseSea = function initialiseSea() {
        const backgrounds = ['./images/water0.png', './images/water1.png']
        let counter = 0

        window.setInterval(() => {
            document.querySelector('#viewport').style.backgroundImage = `url("${
                backgrounds[counter % backgrounds.length]
            }")`
            counter++
        }, 1000)
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller
    } else {
        window.Controller = Controller
    }

    Controller.prototype.renderPorts = function renderPorts(ports) {
        const portsElement = document.querySelector('#ports')
        portsElement.style.width = '0px'

        ports.forEach((port, index) => {
            const newPortElement = document.createElement('div')
            newPortElement.className = 'port'

            newPortElement.dataset.portName = port.name
            newPortElement.dataset.portIndex = index

            const portsElementWidth = parseInt(portsElement.style.width, 10)
            portsElement.style.width = `${portsElementWidth + 256}px`
            portsElement.appendChild(newPortElement)
        })
    }

    Controller.prototype.renderShip = function renderShip() {
        this.ship = ship
        const index = ship.itinerary.ports.indexOf(ship.currentPort)
        const portElement = document.querySelector(
            `[data-port-index = '${index}']`
        )
        const shipElement = document.querySelector('#ship')

        shipElement.style.top = `${portElement.offsetTop + 32}px`
        shipElement.style.left = `${portElement.offsetLeft - 32}px`
    }

    Controller.prototype.setSail = function setSail() {
        this.ship = ship
        const sailButton = document.querySelector('#sailbutton')
        const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1
        const nextPortElement = document.querySelector(
            `[data-port-index = "${nextPortIndex}"]`
        )
        if (!nextPortElement) {
            return this.renderMessage("You're at the end of your trip matey!")
        }
        const shipElement = document.querySelector('#ship')
        const sailInterval = setInterval(() => {
            const shipOffsetLeft = parseInt(shipElement.style.left, 10)
            if (shipOffsetLeft === nextPortElement.offsetLeft - 32) {
                ship.setSail()
                ship.dock()
                this.renderMessage(`Welcome to ${ship.currentPort.name}`)
                this.renderDisplay()
                sailButton.disabled = false
                clearInterval(sailInterval)
            }
            shipElement.style.left = `${shipOffsetLeft + 1}px`
        }, 10)

        this.renderMessage(`Hey Ho! We are leaving ${ship.currentPort.name}`)
    }

    Controller.prototype.renderMessage = function renderMessage(message) {
        const messageElement = document.createElement('div')
        messageElement.setAttribute('id', 'message')
        messageElement.innerHTML = message
        document.querySelector('#viewport').appendChild(messageElement)
        setTimeout(() => {
            document.querySelector('#viewport').removeChild(messageElement)
        }, 1500)
    }

    Controller.prototype.renderDisplay = function renderDisplay() {
        this.ship = ship
        const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1
        const nextPortElement = document.querySelector(
            `[data-port-index = "${nextPortIndex}"]`
        )
        const displayBoard = document.querySelector('#display')
        if (!nextPortElement) {
            return (displayBoard.innerHTML = `Current Port: ${ship.currentPort.name} </br> Next Port: End of the trip`)
        }
        displayBoard.innerHTML = `Current Port: ${ship.currentPort.name} </br> Next Port: ${ship.itinerary.ports[nextPortIndex].name}`
    }

    Controller.prototype.addPorts = function addPorts(itinerary) {
        const submitButton = document.querySelector('#submit')
        function updatePorts(event) {
            event.preventDefault()
            const newPortName = document.querySelector('#portname').value
            itinerary.ports.push(new Port(newPortName))
            document.querySelector('form').reset()
            console.log(itinerary.ports)
            const parent = document.querySelector('#ports')
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild)
            }
            controller.renderPorts(itinerary.ports)
        }
        submitButton.addEventListener('click', updatePorts)
    }
})()
