import React from "react";
import blackPlus from "../../img/plus_black.png";

class TrainingDiary extends React.Component {
    render() {
        return (
            <div className="diary-container-diary-main">

                <div className="diary-container-diary-main-button">
                  <button className="diary-main-button" onClick={() => this.click(1)}>
                    Создать
                  </button>
                </div>

                <div className="diary-main_1" onClick={() => this.click(1)}>
                  <div className="diary-main_2" onClick={() => this.click(1)}>
                    <input type="checkbox" className="checkbox-diary-main-1"/>
                    <p className='diary-main_1-prouch'>Номер подхода</p>
                    <p className='diary-main_1-prouch'>Вес (кг)</p>
                    <p className='diary-main_1-prouch'>Повторения</p>
                    <p className='diary-main_1-prouch-com'>Комментарии</p>
                  </div>
                  <div className="diary-main_3">
                    <input type="checkbox" className="checkbox-diary-main-1"/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-3' placeholder='...'/>
                  </div>
                  <div className="diary-main_3">
                    <input type="checkbox" className="checkbox-diary-main-1"/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-3' placeholder='...'/>
                  </div>
                  <div className="diary-main_3">
                    <input type="checkbox" className="checkbox-diary-main-1"/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-3' placeholder='...'/>
                  </div>
                  <div className="diary-main_5">
                    <img className='img-diary-main-2' src={blackPlus} alt={'img'}/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-2' placeholder='...'/>
                    <input type='text' className='text-diary-main-3' placeholder='...'/>
                  </div>
                </div>

            </div>
        )
    }
}

export default TrainingDiary;