import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1"


var postConfig = {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    }
}

var getConfig = {
    method: 'get',
    headers: {}
};

var deleteConfig = {
    method: 'delete',
    headers: {}
};


export const save = (url, data) => {
    return axios({ ...postConfig, url: baseUrl + url, data: data })
}

export const get = (url) => {
    return axios({ ...getConfig, url: baseUrl + url })
}
export const remove = (url) => {
    return axios({ ...deleteConfig, url: baseUrl + url })
}