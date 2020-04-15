import React from 'react';
import logo from './logo.svg';


import ReactDOM from 'react-dom';


import Tabs from './Tabs';


// import FilteredList from './FilteredListDatasets';

import './App.css';
import './styles.css';

const dataset_list = [
  {name: 'roads',
    yaml: {title:'Roads in general'},
    geojson:{}
    },

  { name: 'car_datasets/small_cars',
    yaml: { title :'Set of small cars'},
    geojson:{}
    },

  { name: 'example_dataset',
    yaml: { title: 'Example dataset'},
    geojson: {}
  }
]

//
const map_list = [
  {name:'dark-matter',
    title:'Dark Matter',
    endpoint:'http://localhost:8080/styles/dark-matter/{z}/{x}/{y}.png'
  },


  {name:'klokantech-basic',
    title:'Basic',
    endpoint:'http://localhost:8080/styles/klokantech-basic/{z}/{x}/{y}.png'
  },


  {name:'osm-bright',
  title:'Bright',
    endpoint:'http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png'
  },
]


const model_list = [
  {name:'example_models/simple_regression',
  type:'sklearn',
    module_path: 'example_models/simple_regression.py'},

  {name: 'example_models/simple_detection',
   type:'sklearn',
    module_path: 'example_models/simple_detection.py'
  },

  {name:'example_models/simple_segmentation',
   type:'sklearn',
    module_path: 'example_models/simple_segmentation.py'
  },

  {name:'models_maxmmsu/simple_classification',
    type:'sklearn',
    module_path: 'example_models/simple_classification.py'
  },

]

const predictor_list = [
  {name:'example_models/regression_2020-01-17',
   model: 'example_models/simple_regression',
  regressor_pickle:'example_models/regression_2020-01-17.pklz',
  trained_process_data:{},
  quality_check_data:{}
  }
]


function App() {
  return (
    <div>
      <Tabs>

        <div label="Datasets">
          <Datasets />
        </div>

        <div label="Maps">
          <Maps />
        </div>

        <div label="Models">
          <Models />
        </div>

        <div label="Predictors">
         <Predictors />
        </div>
      </Tabs>
    </div>
  );
}

class Datasets extends React.Component {
	constructor(props){
    super(props);

    this.state = {
      values: {},
      showValues: {},
      workshop: ""
    }
  }

  componentDidMount() {
        fetch('http://localhost:5000/dataset_list')
        .then(res => res.json())
        .then((data) => {
          this.setState({ workshop: data })
        })
        .catch(console.log)
      }

  handleSelectElement(e){
	  this.setState({
            message_text:  e.target.getAttribute('yaml') + "\n"
                +e.target.getAttribute('geojson')
        });
  }

  render(){
    return (
    		<div>
              <table><tr><td>
            <select id="brow" size="20" className="rebels-selection-list">
            {dataset_list.map(dataset => (
              <option yaml={JSON.stringify(dataset.yaml)}
                      geojson={JSON.stringify(dataset.geojson)}

                      onClick={this.handleSelectElement.bind(this)} >
                {dataset.name}
              </option>
            ))}
            </select>
                </td><td>
              <textarea cols="40" rows="15" value={this.state.message_text}/>
            </td></tr></table>
          </div>
    )
  }
}

class Maps extends React.Component {
	constructor(props){
    super(props);

    this.state = {
      values: {},
      showValues: {},
      workshop: ""
    }
  }
  handleSelectElement(e){
	  this.setState({
            message_text:  e.target.getAttribute('map_title') + "\n"
                +e.target.getAttribute('map_endpoint')
        });
  }

  render(){
    return (
    		<div>
              <table><tr><td>
            <select id="brow" size="20" className="rebels-selection-list">
            {map_list.map(map => (
              <option map_title={map.title}
                      map_endpoint={map.endpoint}

                      onClick={this.handleSelectElement.bind(this)} >
                {map.name}
              </option>
            ))}
            </select>
                </td><td>
              <textarea cols="40" rows="15" value={this.state.message_text}/>
            </td></tr></table>
          </div>
    )
  }
}

class Models extends React.Component {
	constructor(props){
    super(props);

    this.state = {
      values: {},
      showValues: {},
      workshop: ""
    }
  }
  handleSelectElement(e){
	  this.setState({
            message_text:  ReactDOM.findDOMNode(e.target).getAttribute('module_path') +
                "\n" +ReactDOM.findDOMNode(e.target).getAttribute('model_type')
        });
  }

  render(){
    return (
    		<div>
              <table><tr><td>
            <select id="brow" size="20" className="rebels-selection-list">
            {model_list.map(model => (
              <option model_type={model.type}
                      module_path={model.module_path}
                      onClick={this.handleSelectElement.bind(this)} >
                {model.name}
              </option>
            ))}
            </select>
                </td><td>
              <textarea cols="40" rows="15" value={this.state.message_text}/>
            </td></tr></table>
          </div>
    )
  }
}



class Predictors extends React.Component {
	constructor(props){
    super(props);

    this.state = {
      values: {},
      showValues: {},
      workshop: ""
    }
  }
  handleSelectElement(e){
	  this.setState({
            message_text:  ReactDOM.findDOMNode(e.target).getAttribute('predictor_model')
        });
  }

  render(){
    return (
    		<div>
              <table><tr><td>
            <select id="brow" size="20" className="rebels-selection-list">
            {predictor_list.map(predictor => (
              <option predictor_model={predictor.model}
                      onClick={this.handleSelectElement.bind(this)} >
                {predictor.name}
              </option>
            ))}
            </select>
                </td><td>
              <textarea cols="40" rows="15" value={this.state.message_text}/>
            </td></tr></table>
          </div>
    )
  }
}
//
// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }
//
// class Board extends React.Component {
//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }
//
//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }
//
// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [
//         {
//           squares: Array(9).fill(null)
//         }
//       ],
//       stepNumber: 0,
//       xIsNext: true
//     };
//   }
//
//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? "X" : "O";
//     this.setState({
//       history: history.concat([
//         {
//           squares: squares
//         }
//       ]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext
//     });
//   }
//
//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0
//     });
//   }
//
//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);
//
//     const moves = history.map((step, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       );
//     });
//
//     let status;
//     if (winner) {
//       status = "Winner: " + winner;
//     } else {
//       status = "Next player: " + (this.state.xIsNext ? "X" : "O");
//     }
//
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={i => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }
//
// // ========================================
//
// ReactDOM.render(<Game />, document.getElementById("root"));
//
// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
//
//
// class Test extends React.Component {
// 	constructor(props){
//     super(props);
//
//     this.state = {
//       values: {},
//       showValues: {}
//     }
//   }
//
//   handleChange(name, e){
//   	let values = this.state.values;
//     values[name] = e.target.value;
//   	this.setState({values: values})
//   }
//
//   handleClick(e){
//   		let inputValues = this.state.values;
//       this.setState({showValues: inputValues});
//   }
//
//   render(){
//     return (
//     		<div>
//         		<input type="text" value={this.state.values["one"]} onChange={this.handleChange.bind(this, "one")}/>
//             <p>{this.state.showValues["one"]}</p>
//             <input type="text" value={this.state.values["two"]} onChange={this.handleChange.bind(this, "two")}/>
//             <p>{this.state.showValues["two"]}</p>
//             <input type="text" value={this.state.values["three"]} onChange={this.handleChange.bind(this, "three")}/>
//             <p>{this.state.showValues["three"]}</p>
//             <input type="text" value={this.state.values["four"]} onChange={this.handleChange.bind(this, "four")}/>
//             <p>{this.state.showValues["four"]}</p>
//
//             <button onClick={this.handleClick.bind(this)}>Show value</button>
//         </div>
//     )
//   }
// }
//





export default App;
