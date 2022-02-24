import logo from './logo.svg';
import './App.css';
import React from 'react';
function App() {
  return (
    <div className="App">
      
    </div>
  );
}


class Square extends React.Component{
  render(){
    return(
      <div>
        {this.props.value}
      </div>
    )
  }
}

export default App;
