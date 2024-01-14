class UserHelper {
    // save user data
    static saveUser = (user: any) => {
        localStorage.setItem("user", JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            accessToken: user.accessToken,
        }));
    };

    // get user data
    static getUser = () => {
        const userJson = localStorage.getItem('user');
        const user = userJson !== null
            ? JSON.parse(userJson)
            : {
                uid: "",
                displayName: "",
                email: "",
                phoneNumber: "",
                photoURL: "",
                accessToken: "",
            };
        return user;
    };

    // delete user data
    static deleteUser = () => {
        localStorage.removeItem("user");
    };
};

export default UserHelper;