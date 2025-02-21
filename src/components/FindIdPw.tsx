import React, { useState } from "react";
import styles from "styles/Login.module.css";
import axios from "axios";
import { UserModel } from "../common/UserModel";  // 공용 타입 import
import { useNavigate } from "react-router-dom";

function FindIdPw() {
    return(
        <div>
            <h2>아이디비밀번호찾기</h2>
        </div>
    )

}

export default FindIdPw ;
