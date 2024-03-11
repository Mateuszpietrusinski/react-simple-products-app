import {useEffect, useState} from "react";

type LOADING_STATES = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
type Status = {
    loading: LOADING_STATES;
    error: null | Error;
}
interface IUseFetchResponse<ApiResponseData> {
    data: ApiResponseData | null;
    status: Status
}

export const useFetch = <ResponseData>(url: string): IUseFetchResponse<ResponseData> => {

    const [data, setData] =
        useState<ResponseData | null>(null);

    const [status, setStatus] = useState<Status>({
        loading: 'IDLE',
        error: null
    });

    useEffect(() => {

        let ignoreRequest = false;
        const fetchData = async (): Promise<ResponseData> => {
            const result = await fetch(url);
            return await result.json() as ResponseData;
        };

        setStatus({
            loading: 'LOADING',
            error: null
        });

        fetchData()
            .then((result) => {
                if (!ignoreRequest) {
                    setData(() => result);
                    setStatus({
                        loading: 'SUCCESS',
                        error: null
                    } as Status);
                }
            })
            .catch((error: Error) => {
                    if (!ignoreRequest) {
                        const statusError : Status = {
                            loading: 'ERROR',
                            error: error
                        }
                        console.error(statusError)
                        setStatus(statusError);
                        setData(null)
                    }
                }
            );

        return () => {
            ignoreRequest = true;
            setStatus({
                loading: 'IDLE',
                error: null
            });
        }
    }, [url]);

    return {
        data,
        status
    };
};
