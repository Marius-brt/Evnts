import {useEffect, useState} from "react";
import Evnts from "@/evnt";

export default function useEvnt<T>(event: Evnts<T>): [T, (value?: T) => void] {
    const [data, setData] = useState<T>(event.getValue());

    useEffect(() => {
        const e = event.onChange((v) => {
            setData(v)
        })
        return () => {
            e()
        }
    }, [event]);

    const setValue = (value?: T) => {
        event.setValue(value)
    }

    return [data, setValue]
}