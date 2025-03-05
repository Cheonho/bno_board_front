export const MESSAGE = {
    LOGIN: {
        SUCCESS: '로그인 성공.',
        FAILURE: {
            DEFAULT: '아이디 혹은 비밀번호가 다릅니다.',
            NETWORK_ERROR: '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.',
        },
        NETWORK_ERROR: "네트워크 오류",
        GENERIC_ERROR: "문제가 발생했습니다. 다시 시도해 주세요.",
    },

    JOIN: {
        SUCCESS: "회원가입 성공",
        FAILURE: {
            DEFAULT: "회원가입 실패",
            DUPLICATE_EMAIL: "이미 사용 중인 이메일입니다.",
            MISSING_REQUIRED_FIELD: "필수 항목이 누락되었습니다. 모든 항목을 확인해주세요.",
            PASSWORD_TOO_WEAK: "비밀번호가 너무 약합니다. 더 강력한 비밀번호를 입력해 주세요.",
            NETWORK_ERROR: "네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
        },
        NETWORK_ERROR: "네트워크 오류",
        GENERIC_ERROR: "문제가 발생했습니다. 다시 시도해 주세요.",
    },


    PASSWORDCHECK : {
        SUCCESS: '비밀번호 수정이 완료되었습니다.',
        FAILURE: {
            DEFAULT: '비밀번호 수정에 실패했습니다. 다시 시도해 주세요.',
            WRONG_PASSWORD: '입력한 비밀번호가 올바르지 않습니다.',
            USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
            PASSWORD_TOO_WEAK: '비밀번호가 너무 약합니다. 더 강력한 비밀번호를 입력해 주세요.',
            NETWORK_ERROR: '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.',
        },
        NETWORK_ERROR: "네트워크 오류",
        GENERIC_ERROR: "문제가 발생했습니다. 다시 시도해 주세요.",
    },

    NICKNAMECHECK : {
        SUCCESS: '닉네임 수정이 완료되었습니다.',
        FAILURE: {
            DEFAULT: '닉네임 수정에 실패했습니다. 다시 시도해 주세요.',
            NETWORK_ERROR: '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.',
        },
        NETWORK_ERROR: "네트워크 오류",
        GENERIC_ERROR: "문제가 발생했습니다. 다시 시도해 주세요.",
    },

    ADDRESSCHECK : {
        SUCCESS: '주소 수정이 완료되었습니다.',
        FAILURE: {
            DEFAULT: '주소 수정에 실패했습니다. 다시 시도해 주세요.',
            NETWORK_ERROR: '예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.',
        },
        NETWORK_ERROR: "네트워크 오류",
        GENERIC_ERROR: "문제가 발생했습니다. 다시 시도해 주세요.",
    },

}