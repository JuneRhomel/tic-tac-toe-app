import HttpCliestUtilParams from "./interface/http_cliest_util.params";
import ApiConstant from "../../application/constant/api.constant";
import FailureMapperUtil from "../failure_mapper/failure_mapper.util";

export default async function HttpCliestUtil(params: HttpCliestUtilParams) {
    const { url, method, body } = params;

    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
    };

    const response = await fetch(`${ApiConstant.BASE_URL}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });


    const data = await response.json();

    if (response.status >= 400) {
        return FailureMapperUtil(data);
    }
    return data;
}
