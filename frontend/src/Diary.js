import React from 'react';
import MainMenu from "./components/diary/MainMenu";
import Exercises from "./components/diary/Exercises";
import TrainingDiary from "./components/diary/TrainingDiary";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";


const link_api_generic_program = 'http://192.168.31.62:8000/api/generation'
class Diary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  async funcGenericProgram() {
      await axios.post(
          link_api_generic_program, {
            id: 1,
            gender: 'm',
            age: 23,
            weight: 83.1,
            height: 28,
            training_level: "beginner",
            purpose_of_training: "weight_loss"
          }
      ).then(response => {
        this.props.setLoadingProgram()
        this.props.setTrainingProgram(response)
      }).catch(error => {
        console.error(error);
        this.props.setLoadingProgram()
      })
  }

  render() {
    const data = this.props.trainingProgram
    const isLoading = this.props.loadingProgram
    return (
        <div style={{color: "white"}}>
          {isLoading ? (
              <div className="loading-icon">Loading...</div>
          ) : (
              <div>
                {data && <button onClick={() => this.funcGenericProgram()}>Нажми</button>}
              </div>
          )}
        </div>
        // <div className="container-diary-background">
        //   <div className="container-content-diary">
        //     <MainMenu/>
        //     <Exercises/>
        //     <TrainingDiary/>
        //   </div>
        // </div>
    )
  }
}

export default Diary;