import React, { Component } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import "./styles.css";

import soundfile from "./assets/sound/beep-07.wav";

class App extends Component {
  state = {
    barCodeList: [],
    isDone: false,
    scanning: false
  };

  sound = new Audio(soundfile);

  addBarCodeHandler = (barCode) => {
    if(this.state.barCodeList[this.state.barCodeList.length -1]!== barCode){
      this.sound.play();
      this.setState((state) => {
        const list = state.barCodeList.concat(barCode);
        return {
          barCodeList: list
        };
      });
    }
  };

  clearRecordsHandler = () => {
    this.setState({
      barCodeList: []
    });
  };

  doneBtnHandler = () => {
    this.setState((state) => {
      return {
        isDone: !state.isDone
      };
    });
  };

  classes = [];

  render() {
    if (this.state.isDone) {
      this.classes = ["cameraOutput", "hideVideo"];
    } else {
      this.classes = ["cameraOutput"];
    }
    return (
      <div className="App">
        <div className={this.classes.join("")}>
          {this.state.isDone ? null : (
            <BarcodeScannerComponent
              width={400}
              height={400}
              onUpdate={(err, result) => {
                if(result){
                this.addBarCodeHandler(result.text)
                }
              }}
            />
          )}
        </div>
        <div className="resultList">
          {this.state.barCodeList
            .slice(0)
            .reverse()
            .map((item) => {
              return <p key={item}>{item}</p>;
            })}
        </div>
        <div className="bottomControls">
          <button onClick={this.clearRecordsHandler}>CLEAR</button>
          <button onClick={this.doneBtnHandler}>DONE</button>
        </div>
      </div>
    );
  }
}

export default App;
