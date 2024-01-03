import {useBoolEvnt} from "@/index";
import React from "react";
import Evnts from "@/evnt";

type ToggleEventProps = {
    event: Evnts<boolean>,
    children: React.ReactNode,
    invert?: boolean,
}

export default function ToggleEvnt({event, children, invert = false}: ToggleEventProps) {
    const {value} = useBoolEvnt(event);
    const display = invert ? !value : value;
    return display ? children : null;
}