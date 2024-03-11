import {useEffect, useState} from "react";

type LOADING_STATES = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
interface IStatus {
    loading: LOADING_STATES;
    error: null | Error;
}
interface IUseFetchResponse<ApiResponseData> {
    data: ApiResponseData | null;
    status: IStatus
}

export const useFetch = <ResponseData>(url: string): IUseFetchResponse<ResponseData> => {

    const [data, setData] =
        useState<ResponseData | null>(null);

    const [status, setStatus] = useState<IStatus>({
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
                    } as IStatus);
                }
            })
            .catch((error: Error) => {
                    if (!ignoreRequest) {
                        const statusError : IStatus = {
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

