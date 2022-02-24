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
  genColors(val, idx){
    var color = ""
    if(val == " " || idx == this.props.curridx){
      color = "white"
    } else if(this.state.word[idx] == val){
      color = "green"
    } else if(this.state.word.includes(val)){
      color = "orange"
    } else{
      color = "grey"
    }
    return(color)
  }
  renderSquare(val, idx){
    return(
      <div className = "square" style = {{background:this.genColors(val,idx),}}>
        {val}
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
                this.renderSquare(this.props.board[i][n], i)
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
        if(event.keyCode == 13 && this.state.currword.length == 4){ //e.keycode==8
          this.submit();
        }else if(event.keyCode == 8 && this.state.currword.length > 0){
          var temp = this.state.board.slice()
          var tempword = temp[this.state.gameindex]
          tempword = tempword.slice(0,tempword.length-1)
          temp[this.state.gameindex] = tempword;
          this.setState({
            currword: temp[this.state.gameindex],
            board: temp
          })
        }else if(this.state.currword.length<4 && ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123))){
          var currword = this.state.currword.slice()
          currword = currword + event.key
          for(var x = 0; x<=this.state.currword.length-4;x++){
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
