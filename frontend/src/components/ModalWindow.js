import React from 'react'

class ModalWindow extends React.Component {
    render() {
        return (
            <div className={this.props.modalActive ? "container-model-content active" : "container-model-content"}>
                <div className="modal-content">
                    <label className="modal-close" htmlFor="modal-toggle">
                        ✕
                    </label>
                    <h2>Ошибка</h2>
                    <hr />
                    <p>Вам нужно авторизироваться!</p>
                    <button className="modal-content-btn" onClick={e => {this.props.setModalWindow()}}>
                        OK
                    </button>
                </div>
            </div>
        )
    }
}

export default ModalWindow