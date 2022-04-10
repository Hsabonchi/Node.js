const searchComponent = {
    template : ` 
            <div class="card" >
            <div class="card-header">
               <p  style="color:#222831" class="text_style"> search history </p>
            </div>
            <ul class="list-group list-group-flush">
            <li v-for="i in previoussearches" class="p-3 mb-2 bg-danger text-white"  @click="previousinformation(i)"
            style="cursor:pointer;" data-toggle="modal" >{{i.title}}  | {{i.date}}</li>
            </ul>
            </div>`,
        props : {
        previoussearches: {
            name:'previoussearches'
            }     
         },
          methods : {
            previousinformation : function(itemclicked){
            this.$parent.showdetail(itemclicked)
            }
        }   
    }
  
const app = new Vue({
    el: '#IMG',
    data: {
        appName: 'Astro Images APP',
        ListofImg: [],
        selectedName: '',
        usereSearchkey:'',
        detailFlag: false,
        start:0,
        end:4,
        selectedItem:{},  
        previoussearches :[],
        options: [],
        options2: [{
            text: "name1",
            value: "value1"
          }, {
            text: "name2",
            value: "value2"
          }, {
            text: "name3",
            value: "value3"
          }],

        
        // { text: 'select menu' },
        // { text: 'smeargle', value: 'smeargle' },
        // { text: 'treecko', value: 'treecko' },
        // { text: 'Mars', value: 'Mars' },
        // { text: 'saturn', value: 'saturn' },
        // { text: 'nebula', value: 'planetary nebula' }
     
    },
    
    methods: {
        
        loadData:async function(){
            const getAllPokemon = await axios.get(`http://localhost:8888/api/show`)
            // name of array is results
            this.options = getAllPokemon.data.results;        
        },
        showPokemonInfo:async function(Searchkey){
    
            console.log(`Searchkey is ${ this.selectedName}`);
            console.log(`http://localhost:8888/api/search?keyword=${this.selectedName}`)
            const getAllPokemon = await axios.get(`http://localhost:8888/api/search?keyword=${this.selectedName}`)
                                                   
                                                                                 
            // this.selectedItem = getAllPokemon.data; 
            console.log(getAllPokemon.data.sprites.other.dream_world.front_default)   
            this.selectedItem=getAllPokemon.data
            this.detailFlag=true
        }, clear:function() {
            this.detailFlag=false
            this.selectedItem={}
        }
        //   search_pic: async function(Searchkey) {
        //     this. clear()
        //     ListofImg=[]
        //     this.selected=Searchkey
        //     const searchresponse = await axios.post(`http://localhost:8888/api/search_pic?searck_key=${this.selected}`)
        //     this.ListofImg = searchresponse.data;        
        // },
        
        // next:function() {
                
        //         this.start=this.end
        //         this.end=this.end+4
    
               
        //     }
        //     ,
        //  showdetail: function(item) {
          
        //     this.selectedItem=item;
        //     this.detailFlag=true
    
        //    // search history, date format
        //     let today = new Date();
        //     let dd = String(today.getDate()).padStart(2, '0');
        //     let mm = String(today.getMonth() + 1).padStart(2, '0');
        //     let yyyy = today.getFullYear();
        //     today = mm + '/' + dd + '/' + yyyy;

            
        //     //no duplicates of titles/names in the "History".
        //     if( this.previoussearches.length === 0){
                
        //             this.previoussearches.push({
        //                 title:item.title,date:today,url:item.url
        //             })
        //     }else if(this.previoussearches.length  >0 ){
                      
        //             let result = this.previoussearches.filter(o => o.title === item.title)  
        //             console.log(result.length)
        //             if(result.length===0)
        //             this.previoussearches.push({
        //                 title:item.title,date:today,url:item.url
        //             })
        //         }
                 
        //     },
        //     clear:function() {
        //         this.detailFlag=false
        //         this.selectedItem={}
        //         this.ListofImg=[]
        //     }
                
    }, components:{
        'searchComponent':searchComponent
    }, 
    beforeMount() {
          this.loadData()  
            
        }

})
