// this create a new vue instances
let cards = new Vue({
    // use CSS selector or the vue going to live
    el: '#cards',
    data: {
        appName: 'Deck of Cards App',
        shuffle: '',
        // numberOfCards user specified in the input  field
        numberOfCards: '',
        // deck that return back from play api
        deck: {},
        // at the begining not playing
        isPlaying: false,
        selectedCards: []
    },
    // When someone call a function
    // called dynamically
    methods: {
        drawCards: function () {
            let vm = this
            axios.get(`http://localhost:8080/api/draw?number=${this.numberOfCards}&shuffle=${this.shuffle}`)
                .then(response => {
                    console.log(response.data)
                    vm.deck = response.data
                })
        },
        playGame: function () {
            let vm = this
            vm.isPlaying = true
            axios.get(`http://localhost:8080/api/play`)
                .then(response => {
                    vm.deck = response.data
                })
        },
        throwaway: function () {
            let vm = this
            // need to send 2 parameters
            axios.post(`/api/throwaway`, {
                deck: vm.deck,
                selectedCards: vm.selectedCards
            })
            .then(response => {
                vm.deck = response.data
                // no more you can play
                vm.isPlaying = false
            })
        },
        clear: function () {
            this.deck = {}
            this.numberOfCards = ''
            this.shuffle = ''
            this.selectedCards = []
        }
    }
})
