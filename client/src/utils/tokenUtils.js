export const getToken = () => localStorage.getItem("accessToken");

export const setToken = (token) => {
    if (token) {
        localStorage.setItem("accessToken", token);
    } else {
        localStorage.removeItem("accessToken");
    }
};

export const removeToken = () => {
    localStorage.removeItem("accessToken");
};

// Pending Email for OTP flow
export const getPendingEmail = () => localStorage.getItem("pendingEmail");

export const setPendingEmail = (email) => {
    if (email) {
        localStorage.setItem("pendingEmail", email);
    } else {
        localStorage.removeItem("pendingEmail");
    }
};

export const removePendingEmail = () => {
    localStorage.removeItem("pendingEmail");
};
