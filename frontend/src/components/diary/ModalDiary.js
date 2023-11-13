import React from 'react'

class ModalDiary extends React.Component {
    render() {
        return (
            <div className={this.props.modalWindowDiary ? "container-model-content active" : "container-model-content"}>
                <div className={this.props.modalWindowDiary ? "modal-content" : ""}>
                    <label className="modal-close" htmlFor="modal-toggle">
                        ✕
                    </label>
                    <h2>{this.props.h2}</h2>
                    <hr />
                    <p>{this.props.p}</p>
                    <button className="modal-content-btn" onClick={e => {this.props.funcModalWindowDiaryActive()}}>
                        OK
                    </button>
                </div>
            </div>
        )
    }
}

export default ModalDiary