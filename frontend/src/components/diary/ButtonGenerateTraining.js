import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import plus from "../../img/plus_2 1.png";

class GenerateTraining extends React.Component {
    render() {
        const isLoadingProgram = this.props.loadingProgram
        return (
            <>
                <button className="diary-button-generic-program" onClick={() => this.props.funcWindowSettingsActive()}>
                    {isLoadingProgram ? (
                        <ClipLoader color="#00EDDF" className={"img_button_diary_gif"} />
                    ) : (
                        <img className="diary-button-generic-program-img" src={plus} alt="plus" />
                    )}
                </button>
            </>
        )
    }
}

export default GenerateTraining;