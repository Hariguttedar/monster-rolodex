import {Component} from 'react';
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import './App.css';

class App extends Component {
  constructor(){
    super();
    // this.state = {
    //   monstrer1:{
    //     name:'john',
    //   },
    //   monstrer2:{
    //     name:'wick',
    //   }
    // };
    this.state = {
      // monsters:[
      //   {
      //       name:'john',
      //   },
      //   {
      //        name:'wick',
      //   }
      //
      // ]
      monsters : [],
        searchField:''

    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((users) => this.setState(()=> {
          return {monsters: users};
        },
            ()=>{
          console.log(this.state);

        }
        )
        );
  }

  onSearchChange = (event) => {console.log(event.target.value);
      const searchField= event.target.value.toLocaleLowerCase();


      this.setState(()=>{
          return { searchField };
      });
  }

  render(){
      const { monsters, searchField } = this.state;
      const { onSearchChange} = this;
      const filteredMonsters = monsters.filter((monster) =>{
          return monster.name.toLocaleLowerCase().includes(searchField);
      });

    return (
        <div className='App'>
            <h1 className='app-title'>Monsters Rolodex</h1>

      {/*{*/}
      {/*  filteredMonsters.map((monster) =>{*/}
      {/*    return (*/}
      {/*        <div key={monster.id}>*/}
      {/*          <h1>{monster.name}</h1>*/}
      {/*        </div>*/}
      {/*    );*/}
      {/*  })*/}
      {/*}*/}
            <SearchBox
                className = 'monsters-search-box'
                placeholder = 'Search Monsters'
                onChangeHandler={onSearchChange}/>
            <CardList monsters={filteredMonsters}/>
    </div>
    )
  }
}

export default App;
