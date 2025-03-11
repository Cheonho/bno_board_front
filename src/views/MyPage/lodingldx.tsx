import React, {useLayoutEffect, useRef, useState} from "react";
import styles from "../../styles/mypage.module.css";
import Passwordchangeindex from "./passwordchangeindex";
import Addresschangeindex from "./addresschangeindex";

const LodingIdx = () => {

    return (
        <div className={styles.container}>
            <h2>기본 정보</h2>
            <div className={styles.info_box}>
                <span className={styles.info_title}>닉네임</span>
                <div className={styles.info_content2}>ㅤ</div>
                <button className={styles.btn}>수정</button>
            </div>

            <div className={styles.info_box}>
                <span className={styles.info_title}>이메일</span>
                <span className={styles.info_content2}>ㅤ</span>
            </div>
            <Passwordchangeindex />
            <Addresschangeindex />
        </div>
    )

}

export default LodingIdx ;