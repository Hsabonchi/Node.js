/*
   Routes that your Vue.js frontend will make HTTP requests to.

   These Routes will also utilize your Custom Node Module (deckofcards) to get data from the API

*/

const
    cards = require('deckofcards'),
    express = require('express'),
    // allow us to create route
    router = express.Router()

 // express offer router to handle route   
module.exports = () => {

    // localhost:8080/api/draw/?number=n&shuffle=true

    // gets a deck of cards from the API
    router.get('/api/draw', (req, res) => {
        const { number = 1, shuffle = 1 } = req.query
        cards.deck(parseInt(shuffle))
            .then(deck => cards.draw(deck.deck_id, parseInt(number)))
            .then(result => {
                res.json(result)
            })
    })

    // play user can see only 5 cards
    router.get('/api/play', (req, res) => {
        cards.deck(true)
            .then(deck => cards.draw(deck.deck_id, 5))
            .then(result => {
                res.json(result)
            })
    })

    router.post('/api/throwaway', (req, res) => {
        // user passin deck and selectedCards to thrown a away
        const { deck, selectedCards } = req.body
        // user get more cards for the thrown away
        // find and remove the throwaways from the original hand, use filter function on
        // if card.code is NOT included in the throaway
        const remainingCards = deck.cards.filter(card => !selectedCards.includes(card.code))
        cards.draw(deck.deck_id, selectedCards.length)
            .then(result => {
                result.cards = remainingCards.concat(result.cards)
                res.json(result)
            })
    })

    return router
}

