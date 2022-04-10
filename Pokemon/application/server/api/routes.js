// use the express router to create endpoints in our server
const express = require('express');
const router = express.Router();

// require in the custom node module previously built
const pokemon_app= require('pokemon_app');


let page_num=2

    router.get('/show', async (req, res) => {
        try {
        
            const randomimg = await pokemon_app.fetch_pic(page_num);
            res.json(randomimg);
        } catch (err) {
            res.json({ err });
        }
    });


router.get('/search', async (req, res) => {
    
    const{keyword}=req.query;  
    console.log(req.query.keyword) 
        try { 
        const userOption = await pokemon_app.search_pokemon(keyword);
        //let clearList = userOption.filter(img => img.media_type ==='name')
        res.json(userOption);
    } catch (err) {
        res.json({ err });
    }    
});


module.exports = router;
