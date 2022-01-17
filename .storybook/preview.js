import {addParameters, addDecorator} from "@storybook/react"; // <- or your storybook framework
import {html} from "lit";
import { PARAM_KEY } from "../src/constants";

addParameters({
    "storybook-theme-switcher": {
        themes           : [
            {name: "axa", id: "axa"},
            {name: "dbv", id: "dbv"},
        ],
        selectedThemeName: null,
        defaultThemeName : "axa",
    },
});

addDecorator((Story, context) => {
    const { globals: { selectedThemeName }, parameters} = context
    const theme = selectedThemeName ? selectedThemeName : parameters[PARAM_KEY].defaultThemeName
    return (
        <axa-theme theme={theme}>
            <Story />
        </axa-theme>
    )
})
