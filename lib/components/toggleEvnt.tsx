import {useBoolEvnt} from "@/index";
import React from "react";
import Evnts from "@/evnt";

type ToggleEventProps = {
    event: Evnts<boolean>,
    children: React.ReactNode,
    invert?: boolean,
}

export default function ToggleEvnt({event, children, invert = false}: ToggleEventProps) {
    const {data} = useBoolEvnt(event);
    const display = invert ? !data : data;
    return display ? children : null;
}