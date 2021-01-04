import React from 'react'
import tenor from '../common/tenor.gif'
import s from './Error.module.css'

export const Error404 = () => {
    return (
        <div className={s.error}>
            <div className={s.text}>404: PAGE NOT FOUND</div>
            <div className={s.gif}>
                <img src={tenor} alt="error" />
            </div>

        </div>
    )
}
