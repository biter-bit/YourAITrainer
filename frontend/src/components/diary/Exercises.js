import React from "react";
import rectangle from "../../img/rectangle.png";

class Exercises extends React.Component {
    render() {
        return(
            <div className="diary-container-exercises">
              <div className="diary-container-exercise">
                <img className="diary-img-exercise" src={rectangle} alt="foto1" />
                <button className="diary-button-exercise" onClick={() => this.click(1)}>
                  Упражнение
                </button>
              </div>
              <div className="diary-container-exercise">
                <img className="diary-img-exercise" src={rectangle} alt="foto1" />
                <button className="diary-button-exercise" onClick={() => this.click(1)}>
                  Упражнение
                </button>
              </div>
            </div>
        )
    }
}

export default Exercises;