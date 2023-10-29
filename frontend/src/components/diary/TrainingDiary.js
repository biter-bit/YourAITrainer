import React from "react";
import blackPlus from "../../img/plus_black.png";
import basket from "../../img/basket.png"
import app from "../../App";

class TrainingDiary extends React.Component {

    render() {
        // if (this.props.currentTraining['exercize']) {
        //     console.log(this.props.currentTraining)
        // }
        return (
            <div className="diary-container-diary-main">

                <div className="diary-container-diary-main-button">
                  <button className="diary-main-button" onClick={() => this.props.funcSendDataOnBackend()}>
                    Отправить
                  </button>
                </div>

                <div className="diary-main_1">
                  <div className="diary-main_2">
                    <input type="checkbox" className="checkbox-diary-main-1"/>
                    <p className='diary-main_1-prouch'>Номер подхода</p>
                    <p className='diary-main_1-prouch'>Вес (кг)</p>
                    <p className='diary-main_1-prouch'>Повторения</p>
                    <p className='diary-main_1-prouch-com'>Комментарии</p>
                    <img className='img-diary-main-4' style={{opacity: 0, cursor: "auto"}} src={basket}/>
                  </div>
                    {!this.props.currentTraining['exercize'] ? null : (
                            this.props.currentTraining[this.props.currentTraining['exercize']]
                                .map((approach, index) => (
                                        <div className="diary-main_3" key={index}>
                                            <input type="checkbox" className="checkbox-diary-main-1" name="checkbox"
                                                   data-number-approach={index}/>
                                            <input type='text' className='text-diary-main-2'
                                                   placeholder={index + 1} disabled name="number"
                                                   data-number-approach={index}/>
                                            <input type='text' className='text-diary-main-2'
                                                   placeholder={approach.result || '...'}
                                                   name="result" data-number-approach={index}
                                                   onChange={this.props.funcHandleInputChange} value={approach.result || '...'}
                                            />
                                            <input type='text' className='text-diary-main-2'
                                                   placeholder={approach.quantity || '...'}
                                                   name="quantity" data-number-approach={index}
                                                   onChange={this.props.funcHandleInputChange} value={approach.quantity || '...'}
                                            />
                                            <input type='text' className='text-diary-main-3' placeholder='...'
                                                   name="comments" data-number-approach={index}/>
                                            <img className='img-diary-main-4' src={basket} onClick={() => this.props.funcDeleteApproach(index)}/>
                                        </div>
                                    )
                                )
                        )
                    }
                    {/*{this.props.approachesTags && this.props.approachesTags.map((div, index) => div)}*/}
                    {!this.props.currentTraining['exercize'] ? null : (
                      <div className="diary-main_5">
                        <img className='img-diary-main-2' src={blackPlus} onClick={() => this.props.funcAddApproach(
                           this.props.currentTraining['exercize']
                        )}/>
                        {/*<input type='text' className='text-diary-main-2' placeholder='...'/>*/}
                        {/*<input type='text' className='text-diary-main-2' placeholder='...'/>*/}
                        {/*<input type='text' className='text-diary-main-2' placeholder='...'/>*/}
                        {/*<input type='text' className='text-diary-main-3' placeholder='...'/>*/}
                        {/*<img style={{opacity: 0}} src={basket}/>*/}
                      </div>
                    )}
                </div>

            </div>
        )
    }
}

export default TrainingDiary;