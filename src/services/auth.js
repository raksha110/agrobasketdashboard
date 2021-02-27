import axios from "axios";

export const isBrowser = () => typeof window !== "undefined";

export const getCompany = () =>
	isBrowser() && window.localStorage.getItem("company")
		? JSON.parse(window.localStorage.getItem("company"))
		: {};

const setCompany = (user) =>
	window.localStorage.setItem("company", JSON.stringify(user));

export const getToken = () => window.localStorage.getItem("token");

const setToken = (token) => window.localStorage.setItem("token", token);

export const handleRegister = async (data) => {
    try {
        const res = await axios.post("https://agrobasket.herokuapp.com/registerCompany", data)
        console.log(res.data.success);
        if(res.data.success){
            const loginres = await axios.post("https://agrobasket.herokuapp.com/loginCompany", {emailId : data.emailId, password: data.password});
            console.log(loginres.data);
            if(loginres.data.success && loginres.data.token){
                setToken(loginres.data.token);
                setCompany(loginres.data.company);
                return true;
            }
            return false;
        }
        return false;
    } catch (err) {
        return false;
    }
}

export const handleLogin = async (data) => {
    try{
        const loginres = await axios.post("https://agrobasket.herokuapp.com/loginCompany", {emailId : data.emailId, password: data.password});
        console.log(loginres.data);
        if(loginres.data.success && loginres.data.token){
            setToken(loginres.data.token);
            setCompany(loginres.data.company);
            return true;
        }
        return false;
    }catch(err){
        return false;
    }
}

export const isLoggedIn = () => {
	const company = getCompany();
	return company && company.emailId ? true : false;
};

export const logout = () => {
	setCompany({});
};