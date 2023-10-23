import React from 'react';
import axios from "axios";
import MainMenu from "./components/diary/MainMenu";
import Exercises from "./components/diary/Exercises";
import TrainingDiary from "./components/diary/TrainingDiary";
import ClipLoader from "react-spinners/ClipLoader";


const link_api_generic_program = 'http://192.168.31.62:8000/api/generation'
const link_api_check_celery = 'http://192.168.31.62:8000/api/check_task'
class Diary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  async funcGenericProgram() {
      const accessToken = localStorage.getItem("access")
      if (accessToken) {
          try {
              const response = await axios.post(
              link_api_generic_program, {
                id: 1,
                gender: 'm',
                age: 23,
                weight: 83.1,
                height: 28,
                training_level: "beginner",
                purpose_of_training: "weight_loss"
              }, {
                  headers: {'Authorization': `Bearer ${accessToken}`}
              });
              this.props.setLoadingProgram()
              console.log('yes')
              this.funcCheckTaskBackend(response.data.number_task)
          } catch(error) {
            console.error(error);
          }
      }
  }

  async funcCheckTaskBackend(task_id) {
      try {
          const response = await axios.get(link_api_check_celery + `?task_id=${task_id}`, {
              params: {task_id}
          })
          if (response.data.status === 'Panding') {
              setTimeout(() => this.funcCheckTaskBackend(task_id), 30000);
          } else if (response.data.status === 'Success') {
              const result = response.data.result
              this.props.setLoadingProgram()
              this.props.setTrainingProgram(response.data.result)
              console.log('Task result:', result)
          } else if (response.data.status === 'Fail') {
              this.props.setLoadingProgram()
              console.error("Task failed")
          }
      } catch (error) {
          console.error(error)
      }
  }

  render() {
    const data = this.props.trainingProgram
    const isLoading = this.props.loadingProgram
    return (
        <div style={{color: "white"}}>
          {isLoading ? (
              <ClipLoader color="#36d7b7" />
          ) : (
              <div>
                {data && <button onClick={() => this.funcGenericProgram()}>Нажми</button>}
              </div>
          )}
        </div>
        // <div className="container-diary-background">
        //   <div className="container-content-diary">
        //     <MainMenu />
        //     <Exercises />
        //     <TrainingDiary />
        //   </div>
        // </div>
    )
  }
}

export default Diary;