import logo from './logo.svg';
import './App.css';
import React from 'react';
function App() {
  return (
    <div className="App">
      <Game/>
    </div>
  );
}



class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      word: this.props.word,
      curridx: this.props.curridx,
    };
  }
  genColors(val, idx, row){
    var color = ""
    if(val == " " || row == this.props.curridx){
      color = "#fff"
    } else if(this.state.word[idx] == val){
      color = "#6aaa64"
    } else if(this.state.word.includes(val)){
      color = "#c9b458"
    } else{
      color = "#86888a"
    }
    return(color)
  }
  returnUpperCase(val){
    if(val != " "){
      return(
        val.toUpperCase()
      )
    }
    else{
      return(val)
    }
  }
  renderSquare(val, idx, row){
    return(
      <div className = "square" style = {{background:this.genColors(val,idx, row),}}>
        {this.returnUpperCase(val)}
      </div>
    )
  }

  renderBoard(){
    var list = []
    var list2 = []
    
    for (var i = 0; i < 4; i++) {
      list.push(i);
    }
    for (var i = 0; i < this.props.board.length; i++) {
      list2.push(i);
    }
    
    return(
        list2.map((i)=> {return(
          <div className = "container">
            {list.map((n)=> {return(
                this.renderSquare(this.props.board[i][n], n, i)
              )})}
          </div>
        )})
      
    )
  }
  render(){
    return(
      <div>
        {this.renderBoard()}
      </div>
    )
  }
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      word:"wadc",
      currword:"",
      gameindex:0,
      board:Array(4).fill("    ")
    }
  }
  submit(){
    var a = this.state.board.slice()
    a[this.state.gameindex] = this.state.currword
    const curridx = this.state.gameindex
    this.setState({
      board:a,
      currword:"",
      gameindex: curridx + 1,
    })
  }
  component(){
    document.addEventListener("keydown", this.handleKeyDown);
  }
 handleKeyDown = (event)=>{
  if(this.state.gameindex > 3){
    return
  }
  var curr = this.state.currword.replace(/ /g, '')
  if(event.keyCode == 13 && curr.length == 4){ //e.keycode==8
    this.submit();
  }else if(event.keyCode == 8 && curr.length > 0){
    var temp = this.state.board.slice()
    var tempword = curr
    tempword = tempword.slice(0,tempword.length-1)
    for(var x = 0; x<=4-curr.length;x++){
      tempword = tempword + " "
    }
    temp[this.state.gameindex] = tempword;
    this.setState({
      currword: tempword,
      board: temp
    })
  }else if(curr.length<4 && ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123))){
    var currword = curr.slice()
    currword = currword + event.key
    for(var x = 0; x<=4-curr.length;x++){
      currword = currword + " "
    }
    var temp = this.state.board.slice()
    temp[this.state.gameindex] = currword
    this.setState({
      currword: currword,
      board: temp,
    })
  }
}
      


  

  render(){
    this.component()
    return(
      <div>
        <Board
          curridx = {this.state.gameindex}
          word = {this.state.word}
          board = {this.state.board}
        />
      
      </div>
      
    )
  }
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
class Keyboard extends React.Component{

}
export default App;
