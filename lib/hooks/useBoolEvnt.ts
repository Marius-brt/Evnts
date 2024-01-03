import Evnts from "@/evnt";
import useEvnt from "@/hooks/useEvnt";

export default function useBoolEvnt(event: Evnts<boolean>) {
    const {data, setValue} = useEvnt<boolean>(event);

    const toggle = () => {
        setValue(!event.getValue())
    }

    return {data, toggle, setValue}
}