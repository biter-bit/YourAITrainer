import React from 'react'

class ModalDiaryError extends React.Component {
    render() {
        return (
            <div className={this.props.modalWindowDiaryError ? "container-model-content active" : "container-model-content"}>
                <div className={this.props.modalWindowDiaryError ? "modal-content" : ""}>
                    <label className="modal-close" htmlFor="modal-toggle">
                        ✕
                    </label>
                    <h2>Ошибка!</h2>
                    <hr />
                    <p>У вас уже генерируется тренировка. Подождите завершения генерации!</p>
                    <button className="modal-content-btn" onClick={e => {this.props.funcModalWindowDiaryError()}}>
                        OK
                    </button>
                </div>
            </div>
        )
    }
}

export default ModalDiaryError